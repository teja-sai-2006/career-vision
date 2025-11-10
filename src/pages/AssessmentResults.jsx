import React, { useState } from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, Calendar, ExternalLink, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { createPageUrl } from "@/utils";
import RecordResultModal from "../components/assessments/RecordResultModal";

export default function AssessmentResults() {
  const queryClient = useQueryClient();
  const [editingResult, setEditingResult] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: results = [] } = useQuery({
    queryKey: ['assessmentResults'],
    queryFn: () => careerVision.entities.AssessmentResult.filter({ created_by: user?.email }, '-test_date'),
    enabled: !!user,
  });

  const updateResultMutation = useMutation({
  mutationFn: ({ id, data }) => careerVision.entities.AssessmentResult.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessmentResults'] });
      setShowEditModal(false);
      setEditingResult(null);
    },
  });

  const deleteResultMutation = useMutation({
  mutationFn: (id) => careerVision.entities.AssessmentResult.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessmentResults'] });
    },
  });

  const handleUpdateResult = (resultData) => {
    updateResultMutation.mutate({
      id: editingResult.id,
      data: {
        ...editingResult,
        ...resultData,
      }
    });
  };

  const avgScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + (r.percentage || 0), 0) / results.length)
    : 0;

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.domain_name]) acc[result.domain_name] = [];
    acc[result.domain_name].push(result);
    return acc;
  }, {});

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Assessment Results
            </h1>
          </div>
          <p className="text-slate-600 text-lg">Track your progress and achievements</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-700">{results.length}</div>
                  <div className="text-sm text-purple-600">Total Assessments</div>
                </div>
                <Award className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-green-700">{avgScore}%</div>
                  <div className="text-sm text-green-600">Average Score</div>
                </div>
                <TrendingUp className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-orange-700">{Object.keys(groupedResults).length}</div>
                  <div className="text-sm text-orange-600">Domains Covered</div>
                </div>
                <Calendar className="w-12 h-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results by Domain */}
        {results.length === 0 ? (
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="py-16">
              <div className="text-center">
                <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No results recorded yet</h3>
                <p className="text-slate-600 mb-6">Start taking assessments and record your scores!</p>
                <Button
                  onClick={() => window.location.href = createPageUrl("Assessments")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  Browse Assessments
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedResults).map(([domain, domainResults]) => (
            <div key={domain} className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">{domain}</h2>
              <div className="grid gap-4">
                {domainResults.map((result) => (
                  <Card key={result.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-slate-900">
                            {result.website_name}
                          </CardTitle>
                          <p className="text-sm text-slate-500 mt-1">{result.subdomain_name}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingResult(result);
                              setShowEditModal(true);
                            }}
                            className="text-slate-400 hover:text-purple-600"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (window.confirm('Delete this result?')) {
                                deleteResultMutation.mutate(result.id);
                              }
                            }}
                            className="text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-600">Score</span>
                          <span className="text-2xl font-bold text-slate-900">
                            {result.percentage ? `${result.percentage}%` : 
                             `${result.score_obtained}/${result.total_score}`}
                          </span>
                        </div>
                        <Progress value={result.percentage || 0} className="h-2" />
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        {result.test_date && (
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(result.test_date), 'MMM d, yyyy')}
                          </div>
                        )}
                        {result.certificate_url && (
                          <a
                            href={result.certificate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Certificate
                          </a>
                        )}
                      </div>

                      {result.notes && (
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                          {result.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Result Modal */}
      {showEditModal && editingResult && (
        <RecordResultModal
          website={{ name: editingResult.website_name }}
          initialData={editingResult}
          onSubmit={handleUpdateResult}
          onClose={() => {
            setShowEditModal(false);
            setEditingResult(null);
          }}
        />
      )}
    </div>
  );
}