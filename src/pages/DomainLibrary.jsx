import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  DollarSign,
  Search,
  Star,
  TrendingUp,
  Clock,
  BookOpen,
  Info,
} from "lucide-react";
import { careerDomains, careerDomainCategories } from "@/data/careerDomains";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const categories = [{ id: "all", name: "All domains" }, ...careerDomainCategories];

export default function DomainLibrary() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setSelectedCategory("all");
      setSelectedDomain(null);
      return;
    }

    const validIds = new Set(categories.map((category) => category.id));
    if (validIds.has(categoryId)) {
      setSelectedCategory(categoryId);
      setSelectedDomain(null);
    } else {
      setSelectedCategory("all");
      navigate("/domain-set/all", { replace: true });
    }
  }, [categoryId, navigate]);

  const filteredDomains = useMemo(() => {
    return careerDomains.filter((domain) => {
      const matchesCategory =
        selectedCategory === "all" || slugify(domain.category) === selectedCategory;
      const haystack = `${domain.name} ${domain.description} ${domain.skills.join(" ")}`.toLowerCase();
      const matchesSearch = !searchTerm.trim() || haystack.includes(searchTerm.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const activeCategory = categories.find((category) => category.id === selectedCategory);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedDomain(null);
    if (category === "all") {
      navigate("/domain-set/all", { replace: true });
    } else {
      navigate(`/domain-set/${category}`, { replace: true });
    }
  };

  const domainCountByCategory = useMemo(() => {
    return careerDomains.reduce((acc, domain) => {
      const key = slugify(domain.category);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-blue-50 p-6 md:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="gap-2 text-slate-600 hover:text-slate-900"
              onClick={() => navigate("/domain-set")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to domains
            </Button>
            <Badge className="bg-purple-100 text-purple-700">Domain library</Badge>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search career paths"
              className="pl-9"
              aria-label="Search career paths"
            />
          </div>
        </div>

        <Card className="border-none bg-white/90 shadow-xl">
          <CardContent className="space-y-5 p-6">
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "border-purple-200 text-purple-600 hover:bg-purple-50"
                  }
                >
                  {category.name}
                  {category.id !== "all" && (
                    <span className="ml-2 rounded-full bg-purple-100 px-2 text-xs text-purple-600">
                      {domainCountByCategory[category.id] || 0}
                    </span>
                  )}
                </Button>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-sm text-slate-600">
              {selectedCategory === "all" ? (
                <span>Viewing all career domains. Use the filters above to narrow by discipline.</span>
              ) : (
                <span>
                  Showing roles for <strong>{activeCategory?.name}</strong>. Click a card to open the detailed snapshot
                  like the previous app version.
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {filteredDomains.length === 0 ? (
          <Card className="border-none bg-white/90 p-12 text-center shadow-md">
            <CardContent className="space-y-3">
              <CardTitle className="text-lg text-slate-900">No results</CardTitle>
              <p className="text-sm text-slate-600">
                Adjust your filters or search term to find a matching career domain.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredDomains.map((domain) => {
              const futureSummary = domain.future.includes(" - ")
                ? domain.future.split(" - ")[0]
                : domain.future;
              return (
              <Card
                key={domain.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedDomain(domain)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedDomain(domain);
                  }
                }}
                className="h-full cursor-pointer border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-xl text-slate-900">{domain.name}</CardTitle>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{domain.category}</p>
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                      <Star className="mr-1 h-4 w-4 text-amber-500" />
                      {domain.rating}
                    </Badge>
                  </div>
                  <p className="line-clamp-3 text-sm text-slate-600">{domain.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      {domain.avgSalary}
                    </span>
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      {domain.growth} growth
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      Work-life: {domain.workLife}
                    </span>
                    <span className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-rose-500" />
                      Future: {futureSummary}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {domain.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-700">
                        {skill}
                      </Badge>
                    ))}
                    {domain.skills.length > 4 && (
                      <Badge variant="outline" className="border-slate-200 text-slate-500">
                        +{domain.skills.length - 4} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        )}
      </div>

      {selectedDomain && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6"
          role="dialog"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDomain(null);
            }
          }}
        >
          <div className="relative w-full max-w-2xl rounded-3xl border border-purple-200 bg-white p-6 shadow-2xl">
            <button
              type="button"
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600"
              onClick={() => setSelectedDomain(null)}
              aria-label="Close"
            >
              X
            </button>
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge className="bg-purple-100 text-purple-700">{selectedDomain.category}</Badge>
                <h2 className="text-2xl font-semibold text-slate-900">{selectedDomain.name}</h2>
                <p className="text-sm text-slate-600">{selectedDomain.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <DollarSign className="h-4 w-4 text-emerald-500" /> Compensation
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    <strong>Average Salary:</strong> {selectedDomain.avgSalary}
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Work-Life Balance:</strong> {selectedDomain.workLife}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <TrendingUp className="h-4 w-4 text-blue-500" /> Outlook
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    <strong>Growth Rate:</strong> {selectedDomain.growth}
                  </p>
                  <p className="text-sm text-slate-600">
                    <strong>Future Prospects:</strong> {selectedDomain.future}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <BookOpen className="h-4 w-4 text-purple-500" /> Key skills
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedDomain.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-white text-slate-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setSelectedDomain(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
