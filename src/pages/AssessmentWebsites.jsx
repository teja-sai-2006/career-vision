import React, { useState } from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Award, CheckCircle } from "lucide-react";
import RecordResultModal from "../components/assessments/RecordResultModal";

export default function AssessmentWebsites() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const subdomainId = urlParams.get('subdomain_id');
  const subdomainName = urlParams.get('subdomain_name');
  const domainName = urlParams.get('domain_name');

  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [showRecordModal, setShowRecordModal] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: websites = [] } = useQuery({
    queryKey: ['assessmentWebsites', subdomainId],
    queryFn: () => careerVision.entities.AssessmentWebsite.filter({ subdomain_id: subdomainId }),
    enabled: !!user && !!subdomainId,
  });

  const { data: results = [] } = useQuery({
    queryKey: ['assessmentResults'],
    queryFn: () => careerVision.entities.AssessmentResult.filter({ created_by: user?.email }),
    enabled: !!user,
  });

  const createResultMutation = useMutation({
  mutationFn: (data) => careerVision.entities.AssessmentResult.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assessmentResults'] });
      setShowRecordModal(false);
      setSelectedWebsite(null);
    },
  });

  const hasResult = (websiteId) => {
    return results.some(r => r.website_id === websiteId);
  };

  const handleRecordResult = (resultData) => {
    createResultMutation.mutate({
      ...resultData,
      website_id: selectedWebsite.id,
      domain_name: domainName,
      subdomain_name: subdomainName,
      website_name: selectedWebsite.name,
    });
  };

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="text-sm text-slate-500 mb-1">{domainName}</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {subdomainName || 'Assessments'}
            </h1>
            <p className="text-slate-600 mt-1">Click to take an assessment or record your results</p>
          </div>
        </div>

        {/* Websites Grid */}
        {websites.length === 0 ? (
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="py-16">
              <div className="text-center">
                <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No assessments available</h3>
                <p className="text-slate-600">Assessments for this category will be added soon</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <Card key={website.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-bold text-slate-900 flex-1">
                      {website.name}
                    </CardTitle>
                    {hasResult(website.id) && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {website.description && (
                    <p className="text-sm text-slate-600">{website.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {website.difficulty && (
                      <Badge variant="outline" className="bg-slate-50 text-slate-700">
                        {website.difficulty}
                      </Badge>
                    )}
                    {website.is_free && (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Free
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => window.open(website.url, '_blank')}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Take Test
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedWebsite(website);
                        setShowRecordModal(true);
                      }}
                      className="flex-shrink-0"
                    >
                      <Award className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Record Result Modal */}
      {showRecordModal && (
        <RecordResultModal
          website={selectedWebsite}
          onSubmit={handleRecordResult}
          onClose={() => {
            setShowRecordModal(false);
            setSelectedWebsite(null);
          }}
        />
      )}
    </div>
  );
}