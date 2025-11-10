import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { howItWorks, learningCatalog, learningStats } from "@/data/learningCatalog";

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-blue-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <section className="relative overflow-hidden rounded-3xl bg-white/85 p-8 shadow-xl backdrop-blur">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-100 opacity-60 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-100 opacity-50 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5">
              <Badge className="bg-purple-100 text-purple-700">Learning Hub</Badge>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Curated courses that plug straight into your career roadmap
              </h1>
              <p className="max-w-2xl text-base text-slate-600">
                Browse multidisciplinary domains, watch expert playlists, read free library resources, and lock in a
                milestone-driven path. Pick a domain to drill into its subdomains and plan your next learning sprint.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  className="group gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
                  onClick={() => {
                    document.getElementById("learning-domains")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start exploring
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-purple-200 bg-white hover:bg-purple-50"
                  onClick={() => window.open("https://www.youtube.com/watch?v=K0u_kAWLJOA", "_blank")}
                >
                  <Play className="h-4 w-4 text-purple-600" />
                  Watch overview
                </Button>
              </div>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-md">
              {learningStats.map((stat) => (
                <Card key={stat.label} className="border-none bg-white/90 shadow-md">
                  <CardContent className="space-y-1 p-4">
                    <p className={`text-3xl font-semibold ${stat.color}`}>{stat.value}</p>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6" id="learning-domains">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-slate-900">Explore learning domains</h2>
            <p className="max-w-3xl text-sm text-slate-600">
              Click a domain to jump into its subdomains. Each track unlocks deep-dive pages with YouTube playlists,
              courses, library resources, and a step-by-step mastery path.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {learningCatalog.map((domain) => {
              const Icon = domain.icon;
              return (
                <Card
                  key={domain.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/courses/${domain.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(`/courses/${domain.id}`);
                    }
                  }}
                  className="h-full cursor-pointer border border-slate-200/70 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-4 pb-0">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${domain.gradient} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-900">{domain.name}</CardTitle>
                        <p className="mt-1 text-sm text-slate-500">{domain.summary}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                      {domain.metrics.tracks} tracks
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6 text-sm text-slate-600">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        {domain.metrics.hours}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        {domain.metrics.resources} resources
                      </span>
                    </div>
                    <Button variant="ghost" className="gap-2 text-purple-600 hover:bg-purple-50">
                      View subdomains
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {howItWorks.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={item.step} className="border-none bg-gradient-to-br from-white to-purple-50/60 shadow-lg">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-100 text-purple-700">Step {index + 1}</Badge>
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">{item.step}</CardTitle>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </CardHeader>
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}
