import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, ExternalLink, MapPin, DollarSign, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors = {
  saved: "bg-blue-100 text-blue-700 border-blue-200",
  applied: "bg-purple-100 text-purple-700 border-purple-200",
  interviewing: "bg-orange-100 text-orange-700 border-orange-200",
  offer: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
  accepted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  declined: "bg-slate-100 text-slate-700 border-slate-200"
};

export default function JobApplicationCard({ application, onEdit, onDelete, onUpdateStatus }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{application.position}</h3>
                <p className="text-lg text-slate-600">{application.company}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Badge className={`${statusColors[application.status]} border cursor-pointer`}>
                    {application.status.replace('_', ' ')}
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onUpdateStatus(application.id, 'saved')}>
                    Saved
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(application.id, 'applied')}>
                    Applied
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(application.id, 'interviewing')}>
                    Interviewing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(application.id, 'offer')}>
                    Offer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(application.id, 'rejected')}>
                    Rejected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(application.id, 'accepted')}>
                    Accepted
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onUpdateStatus(application.id, 'declined')}>
                    Declined
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-4">
              {application.location && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {application.location}
                </div>
              )}
              {application.salary_range && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  {application.salary_range}
                </div>
              )}
              {application.application_date && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Applied: {format(new Date(application.application_date), 'MMM d, yyyy')}
                </div>
              )}
              {application.contact_person && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="w-4 h-4 text-slate-400" />
                  {application.contact_person}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {application.job_type && (
                <Badge variant="outline" className="bg-slate-50 text-slate-700">
                  {application.job_type.replace('_', ' ')}
                </Badge>
              )}
              {application.remote_type && (
                <Badge variant="outline" className="bg-slate-50 text-slate-700">
                  {application.remote_type.replace('_', ' ')}
                </Badge>
              )}
            </div>

            {application.notes && (
              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mb-4">
                {application.notes}
              </p>
            )}

            {application.follow_up_date && (
              <div className="text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg inline-block">
                Follow up: {format(new Date(application.follow_up_date), 'MMM d, yyyy')}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {application.job_url && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(application.job_url, '_blank')}
                className="text-slate-400 hover:text-blue-600 hover:bg-blue-50"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(application)}
              className="text-slate-400 hover:text-purple-600 hover:bg-purple-50"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(application.id)}
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