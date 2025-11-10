import React, { useState } from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Briefcase, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobApplicationCard from "../components/jobs/JobApplicationCard";
import JobApplicationForm from "../components/jobs/JobApplicationForm";

export default function JobApplications() {
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['jobApplications'],
    queryFn: () => careerVision.entities.JobApplication.filter({ created_by: user?.email }, '-created_date'),
    enabled: !!user,
  });

  const createJobMutation = useMutation({
  mutationFn: (jobData) => careerVision.entities.JobApplication.create(jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
      setShowForm(false);
      setEditingJob(null);
    },
  });

  const updateJobMutation = useMutation({
  mutationFn: ({ id, jobData }) => careerVision.entities.JobApplication.update(id, jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
      setShowForm(false);
      setEditingJob(null);
    },
  });

  const deleteJobMutation = useMutation({
  mutationFn: (id) => careerVision.entities.JobApplication.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
    },
  });

  const handleSubmit = async (jobData) => {
    if (editingJob) {
      updateJobMutation.mutate({ id: editingJob.id, jobData });
    } else {
      createJobMutation.mutate(jobData);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch = !searchTerm || 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusCounts = {
    all: applications.length,
    saved: applications.filter(a => a.status === 'saved').length,
    applied: applications.filter(a => a.status === 'applied').length,
    interviewing: applications.filter(a => a.status === 'interviewing').length,
    offer: applications.filter(a => a.status === 'offer').length,
  };

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Job Applications
            </h1>
            <p className="text-slate-600 mt-1">Track your job search progress</p>
          </div>
          <Button
            onClick={() => {
              setEditingJob(null);
              setShowForm(!showForm);
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Application
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-slate-900">{statusCounts.all}</div>
              <div className="text-sm text-slate-500">Total</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-blue-50/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-700">{statusCounts.saved}</div>
              <div className="text-sm text-blue-600">Saved</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-purple-50/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-700">{statusCounts.applied}</div>
              <div className="text-sm text-purple-600">Applied</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-orange-50/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-700">{statusCounts.interviewing}</div>
              <div className="text-sm text-orange-600">Interviewing</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg bg-green-50/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-700">{statusCounts.offer}</div>
              <div className="text-sm text-green-600">Offers</div>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        {showForm && (
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">
                {editingJob ? 'Edit Application' : 'Add New Application'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <JobApplicationForm
                application={editingJob}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingJob(null);
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search by company or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Tabs value={filter} onValueChange={setFilter}>
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="saved">Saved</TabsTrigger>
                  <TabsTrigger value="applied">Applied</TabsTrigger>
                  <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
                  <TabsTrigger value="offer">Offers</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="py-16">
              <div className="text-center">
                <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {searchTerm || filter !== "all" ? "No applications found" : "No applications yet"}
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchTerm || filter !== "all" 
                    ? "Try adjusting your filters" 
                    : "Start tracking your job applications!"}
                </p>
                {!searchTerm && filter === "all" && (
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Your First Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredApplications.map((app) => (
              <JobApplicationCard
                key={app.id}
                application={app}
                onEdit={(app) => {
                  setEditingJob(app);
                  setShowForm(true);
                }}
                onDelete={(id) => {
                  if (window.confirm('Are you sure you want to delete this application?')) {
                    deleteJobMutation.mutate(id);
                  }
                }}
                onUpdateStatus={(id, status) =>
                  updateJobMutation.mutate({ id, jobData: { ...app, status } })
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}