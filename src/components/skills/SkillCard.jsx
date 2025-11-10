import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2, TrendingUp } from "lucide-react";

const proficiencyLevels = {
  beginner: { value: 25, color: "text-blue-600" },
  intermediate: { value: 50, color: "text-purple-600" },
  advanced: { value: 75, color: "text-orange-600" },
  expert: { value: 100, color: "text-green-600" }
};

export default function SkillCard({ skill, onEdit, onDelete }) {
  const currentLevel = proficiencyLevels[skill.proficiency] || proficiencyLevels.beginner;
  
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-900 mb-1">{skill.name}</h3>
            <Badge variant="outline" className="bg-slate-50 text-slate-700 text-xs">
              {skill.category?.replace('_', ' ')}
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(skill)}
              className="h-8 w-8 text-slate-400 hover:text-purple-600 hover:bg-purple-50"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(skill.id)}
              className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-600">Current Level</span>
              <span className={`text-sm font-bold ${currentLevel.color}`}>
                {skill.proficiency}
              </span>
            </div>
            <Progress value={currentLevel.value} className="h-2" />
          </div>

          {skill.target_level && skill.target_level !== skill.proficiency && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <TrendingUp className="w-3 h-3 text-green-600" />
              Target: {skill.target_level}
            </div>
          )}

          {skill.years_experience !== undefined && (
            <div className="text-xs text-slate-500">
              {skill.years_experience} {skill.years_experience === 1 ? 'year' : 'years'} experience
            </div>
          )}

          {skill.notes && (
            <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
              {skill.notes}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
