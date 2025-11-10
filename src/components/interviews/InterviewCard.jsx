import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Calendar, Clock, MapPin, User } from "lucide-react";
import { format } from "date-fns";

const typeColors = {
  phone_screen: "bg-blue-100 text-blue-700 border-blue-200",
  video_call: "bg-purple-100 text-purple-700 border-purple-200",
  in_person: "bg-green-100 text-green-700 border-green-200",
  technical: "bg-orange-100 text-orange-700 border-orange-200",
  behavioral: "bg-pink-100 text-pink-700 border-pink-200",
  panel: "bg-indigo-100 text-indigo-700 border-indigo-200",
  final: "bg-emerald-100 text-emerald-700 border-emerald-200"
};

const statusColors = {
  scheduled: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  rescheduled: "bg-yellow-100 text-yellow-700"
};

export default function InterviewCard({ interview, onEdit, onDelete }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{interview.position}</h3>
                <p className="text-lg text-slate-600">{interview.company}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={`${typeColors[interview.interview_type]} border`}>
                  {interview.interview_type?.replace('_', ' ')}
                </Badge>
                <Badge className={statusColors[interview.status]}>
                  {interview.status}
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                {format(new Date(interview.interview_date), 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                {format(new Date(interview.interview_date), 'h:mm a')}
              </div>
              {interview.interviewer_name && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="w-4 h-4 text-slate-400" />
                  {interview.interviewer_name}
                </div>
              )}
              {interview.location && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {interview.location}
                </div>
              )}
            </div>

            {interview.preparation_notes && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 mb-1">Preparation Notes:</p>
                <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                  {interview.preparation_notes}
                </p>
              </div>
            )}

            {interview.interview_notes && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 mb-1">Interview Notes:</p>
                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                  {interview.interview_notes}
                </p>
              </div>
            )}

            {interview.questions_asked && interview.questions_asked.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 mb-2">Questions Asked:</p>
                <ul className="list-disc list-inside space-y-1">
                  {interview.questions_asked.map((q, idx) => (
                    <li key={idx} className="text-sm text-slate-600">{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {interview.outcome && interview.outcome !== 'pending' && (
              <Badge className={
                interview.outcome === 'passed' ? 'bg-green-100 text-green-700' :
                interview.outcome === 'rejected' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }>
                Outcome: {interview.outcome.replace('_', ' ')}
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(interview)}
              className="text-slate-400 hover:text-purple-600 hover:bg-purple-50"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(interview.id)}
              className="text-slate-400 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
