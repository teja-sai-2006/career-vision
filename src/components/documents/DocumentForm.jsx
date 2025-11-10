import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { careerVision } from "@/api/careerVisionClient";
import { Upload, Loader2 } from "lucide-react";

export default function DocumentForm({ document, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(document || {
    title: "",
    document_type: "resume",
    file_url: "",
    version: "",
    description: "",
    tags: [],
    last_updated: new Date().toISOString().split('T')[0],
    is_current: false
  });
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
  const { file_url } = await careerVision.integrations.Core.UploadFile({ file });
    setFormData({ ...formData, file_url });
    setUploading(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Document Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Resume 2024 v2"
            required
          />
        </div>
        <div>
          <Label htmlFor="document_type">Document Type *</Label>
          <Select
            value={formData.document_type}
            onValueChange={(value) => setFormData({ ...formData, document_type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="resume">Resume</SelectItem>
              <SelectItem value="cover_letter">Cover Letter</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="certificate">Certificate</SelectItem>
              <SelectItem value="reference">Reference</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="file">Upload File</Label>
        <div className="flex gap-2">
          <Input
            id="file"
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            accept=".pdf,.doc,.docx,.txt"
          />
          {uploading && <Loader2 className="w-5 h-5 animate-spin text-purple-600" />}
        </div>
        {formData.file_url && (
          <p className="text-xs text-green-600 mt-1">✓ File uploaded successfully</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="version">Version</Label>
          <Input
            id="version"
            value={formData.version}
            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
            placeholder="e.g., v2.0, 2024"
          />
        </div>
        <div>
          <Label htmlFor="last_updated">Last Updated</Label>
          <Input
            id="last_updated"
            type="date"
            value={formData.last_updated}
            onChange={(e) => setFormData({ ...formData, last_updated: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Add a description..."
          rows={2}
        />
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="Add a tag..."
          />
          <Button type="button" onClick={addTag} variant="outline">Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs flex items-center gap-1">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-600">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="is_current"
          type="checkbox"
          checked={formData.is_current}
          onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
          className="rounded"
        />
        <Label htmlFor="is_current" className="cursor-pointer">
          Mark as current version
        </Label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          {document ? 'Update Document' : 'Add Document'}
        </Button>
      </div>
    </form>
  );
}