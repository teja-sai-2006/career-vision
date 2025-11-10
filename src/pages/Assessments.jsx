import React from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ArrowRight,
  Brain,
  Briefcase,
  ClipboardCheck,
  CloudCog,
  Code,
  Code2,
  DollarSign,
  GraduationCap,
  Heart,
  MonitorSmartphone,
  Scale,
  Stethoscope,
  UserCheck,
  Wrench,
} from "lucide-react";

const domainIcons = {
  Code,
  Code2,
  MonitorSmartphone,
  Brain,
  UserCheck,
  CloudCog,
  Heart,
  Briefcase,
  Wrench,
  GraduationCap,
  Scale,
  Stethoscope,
  DollarSign,
};

export default function Assessments() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: domains = [] } = useQuery({
    queryKey: ['assessmentDomains'],
    queryFn: () => careerVision.entities.AssessmentDomain.list('order'),
    enabled: !!user,
  });

  const { data: allSubdomains = [] } = useQuery({
    queryKey: ['assessmentSubdomains'],
    queryFn: () => careerVision.entities.AssessmentSubdomain.list(),
    enabled: !!user,
  });

  const getSubdomainCount = (domainId) => {
    return allSubdomains.filter(s => s.domain_id === domainId).length;
  };

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ClipboardCheck className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Skill Assessments
            </h1>
          </div>
          <p className="text-slate-600 text-lg">
            Test your skills across various domains and track your progress
          </p>
        </div>

        {/* Domains Grid */}
        {domains.length === 0 ? (
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="py-16">
              <div className="text-center">
                <ClipboardCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No assessment domains available yet</h3>
                <p className="text-slate-600">Assessment domains will be added soon</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain) => {
              const Icon = domainIcons[domain.icon] || ClipboardCheck;
              const subdomainCount = getSubdomainCount(domain.id);
              const gradient = domain.gradient || domain.color || "from-purple-500 to-blue-500";
              
              return (
                <Link 
                  key={domain.id} 
                  to={`${createPageUrl("AssessmentSubdomains")}?domain_id=${domain.id}&domain_name=${encodeURIComponent(domain.name)}`}
                >
                  <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur group cursor-pointer h-full">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                            {domain.name}
                          </h3>
                          {domain.description && (
                            <p className="text-sm text-slate-600 mb-3">
                              {domain.description}
                            </p>
                          )}
                          <div className="flex items-center justify-center gap-2 text-purple-600 font-semibold">
                            <span>{subdomainCount} Subdomain{subdomainCount === 1 ? "" : "s"}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
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