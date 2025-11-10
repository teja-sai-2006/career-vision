import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

export default function RecordResultModal({ website, initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState(initialData || {
    score_obtained: "",
    total_score: "",
    percentage: "",
    test_date: new Date().toISOString().split('T')[0],
    notes: "",
    certificate_url: ""
  });

  const [scoreType, setScoreType] = useState(
    initialData?.percentage ? "percentage" : "points"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const resultData = {
      ...formData,
      test_date: formData.test_date || new Date().toISOString().split('T')[0],
    };

    // Calculate percentage if using points
    if (scoreType === "points" && formData.score_obtained && formData.total_score) {
      resultData.percentage = Math.round((formData.score_obtained / formData.total_score) * 100);
    }

    onSubmit(resultData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-none shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-xl font-bold">
            Record Result - {website.name}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Score Type Selection */}
            <div>
              <Label>Score Type</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant={scoreType === "points" ? "default" : "outline"}
                  onClick={() => setScoreType("points")}
                  className="flex-1"
                >
                  Points
                </Button>
                <Button
                  type="button"
                  variant={scoreType === "percentage" ? "default" : "outline"}
                  onClick={() => setScoreType("percentage")}
                  className="flex-1"
                >
                  Percentage
                </Button>
              </div>
            </div>

            {/* Score Input */}
            {scoreType === "points" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="score_obtained">Score Obtained *</Label>
                  <Input
                    id="score_obtained"
                    type="number"
                    min="0"
                    value={formData.score_obtained}
                    onChange={(e) => setFormData({ ...formData, score_obtained: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="total_score">Total Score *</Label>
                  <Input
                    id="total_score"
                    type="number"
                    min="0"
                    value={formData.total_score}
                    onChange={(e) => setFormData({ ...formData, total_score: parseFloat(e.target.value) })}
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="percentage">Percentage Score *</Label>
                <Input
                  id="percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: parseFloat(e.target.value) })}
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="test_date">Test Date *</Label>
              <Input
                id="test_date"
                type="date"
                value={formData.test_date}
                onChange={(e) => setFormData({ ...formData, test_date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="certificate_url">Certificate URL (optional)</Label>
              <Input
                id="certificate_url"
                type="url"
                value={formData.certificate_url}
                onChange={(e) => setFormData({ ...formData, certificate_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any notes about this assessment..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                {initialData ? 'Update Result' : 'Save Result'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
