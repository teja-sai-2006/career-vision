import React from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";

export default function AssessmentSubdomains() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const domainId = urlParams.get('domain_id');
  const domainName = urlParams.get('domain_name');

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: subdomains = [] } = useQuery({
    queryKey: ['assessmentSubdomains', domainId],
    queryFn: () => careerVision.entities.AssessmentSubdomain.filter({ domain_id: domainId }, 'order'),
    enabled: !!user && !!domainId,
  });

  const { data: allWebsites = [] } = useQuery({
    queryKey: ['assessmentWebsites'],
    queryFn: () => careerVision.entities.AssessmentWebsite.list(),
    enabled: !!user,
  });

  const getWebsiteCount = (subdomainId) => {
    return allWebsites.filter(w => w.subdomain_id === subdomainId).length;
  };

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(createPageUrl("Assessments"))}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {domainName || 'Assessment Categories'}
            </h1>
            <p className="text-slate-600 mt-1">Choose a category to explore assessments</p>
          </div>
        </div>

        {/* Subdomains List */}
        {subdomains.length === 0 ? (
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="py-16">
              <div className="text-center">
                <Layers className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No categories available</h3>
                <p className="text-slate-600">Categories for this domain will be added soon</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {subdomains.map((subdomain) => {
              const websiteCount = getWebsiteCount(subdomain.id);
              
              return (
                <Link 
                  key={subdomain.id}
                  to={`${createPageUrl("AssessmentWebsites")}?subdomain_id=${subdomain.id}&subdomain_name=${encodeURIComponent(subdomain.name)}&domain_name=${encodeURIComponent(domainName)}`}
                >
                  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">
                            {subdomain.name}
                          </h3>
                          {subdomain.description && (
                            <p className="text-sm text-slate-600 mb-2">
                              {subdomain.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
                            <span>{websiteCount} Assessment{websiteCount !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}