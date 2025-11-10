import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InterviewForm({ interview, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(interview || {
    company: "",
    position: "",
    interview_date: "",
    interview_type: "video_call",
    interviewer_name: "",
    status: "scheduled",
    preparation_notes: "",
    interview_notes: "",
    outcome: "pending",
    location: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="interview_date">Date & Time *</Label>
          <Input
            id="interview_date"
            type="datetime-local"
            value={formData.interview_date}
            onChange={(e) => setFormData({ ...formData, interview_date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="interview_type">Interview Type</Label>
          <Select
            value={formData.interview_type}
            onValueChange={(value) => setFormData({ ...formData, interview_type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone_screen">Phone Screen</SelectItem>
              <SelectItem value="video_call">Video Call</SelectItem>
              <SelectItem value="in_person">In Person</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="panel">Panel</SelectItem>
              <SelectItem value="final">Final</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="interviewer_name">Interviewer Name</Label>
          <Input
            id="interviewer_name"
            value={formData.interviewer_name}
            onChange={(e) => setFormData({ ...formData, interviewer_name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="rescheduled">Rescheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location / Video Link</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., Zoom link or office address"
        />
      </div>

      <div>
        <Label htmlFor="preparation_notes">Preparation Notes</Label>
        <Textarea
          id="preparation_notes"
          value={formData.preparation_notes}
          onChange={(e) => setFormData({ ...formData, preparation_notes: e.target.value })}
          placeholder="What do you need to prepare?"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="interview_notes">Interview Notes</Label>
        <Textarea
          id="interview_notes"
          value={formData.interview_notes}
          onChange={(e) => setFormData({ ...formData, interview_notes: e.target.value })}
          placeholder="Notes from the interview..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="outcome">Outcome</Label>
        <Select
          value={formData.outcome}
          onValueChange={(value) => setFormData({ ...formData, outcome: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="passed">Passed</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="need_more_rounds">Need More Rounds</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          {interview ? 'Update Interview' : 'Add Interview'}
        </Button>
      </div>
    </form>
  );
}
