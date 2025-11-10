import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

const categoryColors = {
  skill_development: "bg-blue-100 text-blue-700 border-blue-200",
  education: "bg-purple-100 text-purple-700 border-purple-200",
  networking: "bg-green-100 text-green-700 border-green-200",
  job_search: "bg-orange-100 text-orange-700 border-orange-200",
  promotion: "bg-pink-100 text-pink-700 border-pink-200",
  career_change: "bg-indigo-100 text-indigo-700 border-indigo-200",
  work_life_balance: "bg-teal-100 text-teal-700 border-teal-200",
  other: "bg-slate-100 text-slate-700 border-slate-200"
};

const statusColors = {
  not_started: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  on_hold: "bg-yellow-100 text-yellow-700"
};

const priorityColors = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700"
};

export default function GoalCard({ goal, onEdit, onDelete }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-900 mb-2">{goal.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className={`${categoryColors[goal.category]} border text-xs`}>
                {goal.category?.replace('_', ' ')}
              </Badge>
              <Badge className={`${statusColors[goal.status]} text-xs`}>
                {goal.status?.replace('_', ' ')}
              </Badge>
              <Badge className={`${priorityColors[goal.priority]} text-xs`}>
                {goal.priority} priority
              </Badge>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(goal)}
              className="h-8 w-8 text-slate-400 hover:text-purple-600 hover:bg-purple-50"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(goal.id)}
              className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {goal.description && (
          <p className="text-sm text-slate-600 line-clamp-2">{goal.description}</p>
        )}
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-slate-600">Progress</span>
            <span className="text-xs font-semibold text-slate-900">{goal.progress || 0}%</span>
          </div>
          <Progress value={goal.progress || 0} className="h-2" />
        </div>

        {goal.target_date && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3 h-3" />
            Target: {format(new Date(goal.target_date), 'MMM d, yyyy')}
          </div>
        )}

        {goal.notes && (
          <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">
            {goal.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
}