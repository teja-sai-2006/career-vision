import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calculator,
  Camera,
  Code,
  Compass,
  Globe,
  HardHat,
  Heart,
  Microscope,
  Palette,
  Scale,
  Search,
  Sparkles,
} from "lucide-react";
import { careerDomains } from "@/data/careerDomains";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categoryMeta = [
  {
    id: "technology",
    name: "Technology",
    summary: "Software engineering, cloud, AI, and security paths.",
    icon: Code,
    gradient: "from-indigo-500 to-sky-500",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    summary: "Clinical care, therapy, and medical research careers.",
    icon: Heart,
    gradient: "from-rose-500 to-red-500",
  },
  {
    id: "business",
    name: "Business",
    summary: "Strategy, product, marketing, and people leadership.",
    icon: Briefcase,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "finance",
    name: "Finance",
    summary: "Analysis, investing, and capital markets roles.",
    icon: Calculator,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "design",
    name: "Design",
    summary: "Product, visual, and motion design specializations.",
    icon: Palette,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "creative-arts",
    name: "Creative Arts",
    summary: "Content creation, gaming, and production careers.",
    icon: Camera,
    gradient: "from-fuchsia-500 to-purple-500",
  },
  {
    id: "education",
    name: "Education",
    summary: "Teaching, curriculum design, and academic leadership.",
    icon: BookOpen,
    gradient: "from-sky-500 to-blue-500",
  },
  {
    id: "science",
    name: "Science",
    summary: "Environmental and biotech research opportunities.",
    icon: Microscope,
    gradient: "from-green-500 to-lime-500",
  },
  {
    id: "engineering",
    name: "Engineering",
    summary: "Mechanical, civil, and electrical engineering roles.",
    icon: HardHat,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "law",
    name: "Law",
    summary: "Legal advocacy, policy, and compliance careers.",
    icon: Scale,
    gradient: "from-slate-500 to-slate-700",
  },
  {
    id: "social-services",
    name: "Social Services",
    summary: "Community impact, social work, and advocacy.",
    icon: Globe,
    gradient: "from-orange-500 to-red-400",
  },
];

function countRolesForCategory(categoryId) {
  return careerDomains.filter((domain) => {
    const slug = domain.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return slug === categoryId;
  }).length;
}

export default function DomainSet() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const totalRoles = careerDomains.length;
  const filteredDomains = useMemo(() => {
    if (!query.trim()) return categoryMeta;
    const needle = query.trim().toLowerCase();
    return categoryMeta.filter((domain) => {
      const haystack = `${domain.name} ${domain.summary}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-blue-50 p-6 md:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <section className="relative overflow-hidden rounded-3xl bg-white/85 p-8 shadow-xl backdrop-blur">
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-purple-100 opacity-60 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-100 opacity-50 blur-3xl" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
            <div className="space-y-6">
              <Badge className="bg-purple-100 text-purple-700">Domain set</Badge>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Choose a domain to explore careers</h1>
              <p className="max-w-2xl text-sm text-slate-600">
                These domains mirror the legacy Career Vision experience. Pick a domain to view its subdomains and open
                detailed cards covering salary, growth outlook, skills, and future prospects.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-none bg-white/90 shadow-md">
                  <CardContent className="space-y-1 p-4">
                    <p className="text-3xl font-semibold text-purple-600">{categoryMeta.length}</p>
                    <p className="text-sm text-slate-600">career domains</p>
                  </CardContent>
                </Card>
                <Card className="border-none bg-white/90 shadow-md">
                  <CardContent className="space-y-1 p-4">
                    <p className="text-3xl font-semibold text-blue-600">{totalRoles}</p>
                    <p className="text-sm text-slate-600">role snapshots</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-600/90 to-blue-600/90 p-6 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/15 p-3">
                  <Compass className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-purple-100">How it works</p>
                  <h2 className="text-lg font-semibold">Find the right domain fit</h2>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-purple-50">
                <li className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-purple-100" />
                  <span>Choose a domain card to jump into its subdomains.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-purple-100" />
                  <span>Click any subdomain to open a detailed career insight card.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="mt-1 h-5 w-5 flex-shrink-0 text-purple-100" />
                  <span>Use data points for salary benchmarks, required skills, and growth outlook.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Browse domains</h2>
              <p className="max-w-2xl text-sm text-slate-600">
                Filter by domain name to find the areas you want to explore. Each card opens the familiar career library
                from the previous version of the app.
              </p>
            </div>
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search domains"
                className="pl-9"
                aria-label="Search domains"
              />
            </div>
          </div>

          {filteredDomains.length === 0 ? (
            <Card className="border-none bg-white/90 p-8 text-center shadow-md">
              <CardContent className="space-y-3">
                <CardTitle className="text-lg text-slate-900">No domains matched</CardTitle>
                <p className="text-sm text-slate-600">Try a different search term to locate a domain.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredDomains.map((domain) => {
                const Icon = domain.icon;
                const roleCount = countRolesForCategory(domain.id);
                return (
                  <Card
                    key={domain.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/domain-set/${domain.id}`)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(`/domain-set/${domain.id}`);
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
                        {roleCount} roles
                      </Badge>
                    </CardHeader>
                    <CardContent className="pt-6 text-sm text-slate-600">
                      <Button variant="ghost" className="gap-2 text-purple-600 hover:bg-purple-50">
                        Open domain
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
