import React, { useState } from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, BookOpen, Calendar } from "lucide-react";
import InterviewCard from "../components/interviews/InterviewCard";
import InterviewForm from "../components/interviews/InterviewForm";
import { isFuture, isPast, isToday } from "date-fns";

export default function Interviews() {
  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: interviews = [] } = useQuery({
    queryKey: ['interviews'],
    queryFn: () => careerVision.entities.Interview.filter({ created_by: user?.email }, '-interview_date'),
    enabled: !!user,
  });

  const createInterviewMutation = useMutation({
  mutationFn: (data) => careerVision.entities.Interview.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      setShowForm(false);
      setEditingInterview(null);
    },
  });

  const updateInterviewMutation = useMutation({
  mutationFn: ({ id, data }) => careerVision.entities.Interview.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
      setShowForm(false);
      setEditingInterview(null);
    },
  });

  const deleteInterviewMutation = useMutation({
  mutationFn: (id) => careerVision.entities.Interview.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
  });

  const handleSubmit = async (data) => {
    if (editingInterview) {
      updateInterviewMutation.mutate({ id: editingInterview.id, data });
    } else {
      createInterviewMutation.mutate(data);
    }
  };

  const upcomingInterviews = interviews.filter(i => 
    i.status === 'scheduled' && isFuture(new Date(i.interview_date))
  );
  
  const todayInterviews = interviews.filter(i => 
    i.status === 'scheduled' && isToday(new Date(i.interview_date))
  );

  const pastInterviews = interviews.filter(i => 
    i.status === 'completed' || isPast(new Date(i.interview_date))
  );

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Interview Tracker
            </h1>
            <p className="text-slate-600 mt-1">Prepare and track your interviews</p>
          </div>
          <Button
            onClick={() => {
              setEditingInterview(null);
              setShowForm(!showForm);
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Interview
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg bg-orange-50/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-orange-700">{todayInterviews.length}</div>
                  <div className="text-sm text-orange-600">Today</div>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-blue-50/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-700">{upcomingInterviews.length}</div>
                  <div className="text-sm text-blue-600">Upcoming</div>
                </div>
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-slate-50/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-slate-700">{pastInterviews.length}</div>
                  <div className="text-sm text-slate-600">Completed</div>
                </div>
                <BookOpen className="w-8 h-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview Form */}
        {showForm && (
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">
                {editingInterview ? 'Edit Interview' : 'Add New Interview'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InterviewForm
                interview={editingInterview}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingInterview(null);
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Today's Interviews */}
        {todayInterviews.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Today's Interviews</h2>
            <div className="grid gap-4">
              {todayInterviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  onEdit={(interview) => {
                    setEditingInterview(interview);
                    setShowForm(true);
                  }}
                  onDelete={(id) => {
                    if (window.confirm('Are you sure?')) {
                      deleteInterviewMutation.mutate(id);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Interviews */}
        {upcomingInterviews.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Interviews</h2>
            <div className="grid gap-4">
              {upcomingInterviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  onEdit={(interview) => {
                    setEditingInterview(interview);
                    setShowForm(true);
                  }}
                  onDelete={(id) => {
                    if (window.confirm('Are you sure?')) {
                      deleteInterviewMutation.mutate(id);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past Interviews */}
        {pastInterviews.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Past Interviews</h2>
            <div className="grid gap-4">
              {pastInterviews.slice(0, 5).map((interview) => (
                <InterviewCard
                  key={interview.id}
                  interview={interview}
                  onEdit={(interview) => {
                    setEditingInterview(interview);
                    setShowForm(true);
                  }}
                  onDelete={(id) => {
                    if (window.confirm('Are you sure?')) {
                      deleteInterviewMutation.mutate(id);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {interviews.length === 0 && (
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="py-16">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No interviews yet</h3>
                <p className="text-slate-600 mb-6">Start tracking your interview schedule!</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Interview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}