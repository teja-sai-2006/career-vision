import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { careerVision } from "@/api/careerVisionClient";
import { careerQuizQuestions } from "@/data/careerQuizQuestions";
import { careerDomains } from "@/data/careerDomains";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Lightbulb,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Clock,
  History,
  Compass,
  Target,
} from "lucide-react";

const DIMENSION_LABELS = {
  technology: "Technology",
  data: "Data",
  design: "Design",
  creative: "Creativity",
  business: "Business",
  operations: "Operations",
  healthcare: "Healthcare",
  science: "Science",
  social: "People & Impact",
};

const DIMENSION_CATEGORY_MAP = {
  technology: ["Technology", "Engineering"],
  data: ["Technology", "Science", "Business"],
  design: ["Design", "Creative Arts"],
  creative: ["Creative Arts", "Design"],
  business: ["Business", "Finance", "Law"],
  operations: ["Business", "Engineering"],
  healthcare: ["Healthcare"],
  science: ["Science", "Healthcare"],
  social: ["Social Services", "Education", "Healthcare"],
};

const DIMENSION_DETAILS = {
  technology: {
    title: "Technical Builder",
    summary: "You lean into problem solving with code, systems, and emerging tools.",
    nextSteps: [
      "Prototype a full-stack project that solves a real workflow challenge",
      "Join a cloud or DevOps cohort to deepen infrastructure mastery",
      "Pair with engineering peers to review architecture trade-offs",
    ],
  },
  data: {
    title: "Insight Architect",
    summary: "Patterns, evidence, and analytical storytelling guide your decisions.",
    nextSteps: [
      "Complete a data storytelling project with a compelling dashboard",
      "Practice experimentation frameworks to validate product ideas",
      "Explore machine learning fundamentals that match your interests",
    ],
  },
  design: {
    title: "Experience Designer",
    summary: "You obsess over usability, emotion, and crafting delightful journeys.",
    nextSteps: [
      "Ship an end-to-end case study that highlights research to high-fidelity",
      "Build a reusable design system or component library",
      "Run usability tests to strengthen your insight-to-iteration loop",
    ],
  },
  creative: {
    title: "Creative Storyteller",
    summary: "Narrative, experimentation, and originality fuel your work.",
    nextSteps: [
      "Launch a personal creative series documenting your process",
      "Experiment with motion, audio, or immersive media to stretch range",
      "Collaborate on cross-disciplinary projects to sharpen storytelling",
    ],
  },
  business: {
    title: "Strategic Operator",
    summary: "You balance vision with execution, aligning teams around measurable outcomes.",
    nextSteps: [
      "Define a lightweight business case for an idea you care about",
      "Practice executive-style storytelling with concise narratives",
      "Lead a retrospective to refine processes and capture learnings",
    ],
  },
  operations: {
    title: "Systems Orchestrator",
    summary: "Structure, logistics, and continuous improvement keep you in flow.",
    nextSteps: [
      "Map a complex workflow and identify automation opportunities",
      "Implement an OKR or KPI dashboard that the team will actually use",
      "Shadow an operations leader to learn playbooks for scaling",
    ],
  },
  healthcare: {
    title: "Wellness Champion",
    summary: "People-first care, empathy, and clinical excellence resonate deeply.",
    nextSteps: [
      "Volunteer or job shadow in a care setting to test day-to-day fit",
      "Pursue certifications that align with your preferred speciality",
      "Join a healthcare innovation community to see emerging practices",
    ],
  },
  science: {
    title: "Discovery Specialist",
    summary: "Research, experimentation, and evidence-based rigor guide you forward.",
    nextSteps: [
      "Design a mini research study and publish your findings",
      "Apply to fellowships or labs aligned with your curiosity",
      "Pair with data teams to translate insights into applied solutions",
    ],
  },
  social: {
    title: "People Advocate",
    summary: "You create impact through coaching, facilitation, and community building.",
    nextSteps: [
      "Run a workshop or cohort that supports a community you care about",
      "Earn credentials in counseling, coaching, or education practice",
      "Document stories of impact to strengthen your advocacy platform",
    ],
  },
};

function calculateOutcome(answers) {
  const dimensionScores = {};

  careerQuizQuestions.forEach((question) => {
    const selectedOptionId = answers[question.id];
    const selectedOption = question.options.find((option) => option.id === selectedOptionId);
    if (!selectedOption) return;

    Object.entries(selectedOption.dimensions).forEach(([dimension, weight]) => {
      dimensionScores[dimension] = (dimensionScores[dimension] || 0) + weight;
    });
  });

  const orderedDimensions = Object.entries(dimensionScores)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);

  const totalScore = orderedDimensions.reduce((sum, entry) => sum + entry.score, 0) || 1;

  const dimensionBreakdown = orderedDimensions.map((entry) => ({
    ...entry,
    label: DIMENSION_LABELS[entry.id] || entry.id,
    percentage: Math.round((entry.score / totalScore) * 100),
    details: DIMENSION_DETAILS[entry.id] || null,
  }));

  const topDimensions = dimensionBreakdown.slice(0, 3);
  const recommendedCategories = [];

  topDimensions.forEach((entry) => {
    const mappedCategories = DIMENSION_CATEGORY_MAP[entry.id] || [];
    mappedCategories.forEach((category) => {
      if (!recommendedCategories.includes(category)) {
        recommendedCategories.push(category);
      }
    });
  });

  const recommendedDomains = careerDomains
    .filter((domain) => recommendedCategories.includes(domain.category))
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 5);

  const topDimension = topDimensions[0] || null;
  const completedAt = new Date().toISOString();

  const summary = topDimension
    ? `Your strengths lean toward ${topDimension.label}. Explore ${
        recommendedDomains[0]?.name || recommendedCategories[0] || "matching domains"
      } to keep momentum.`
    : "Answer more questions to unlock a personalized recommendation.";

  return {
    dimensionScores,
    dimensionBreakdown,
    recommendedCategories,
    recommendedDomains,
    topDimension,
    completedAt,
    summary,
  };
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatTopic(value) {
  if (!value) return "";
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function CareerQuiz() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const totalQuestions = careerQuizQuestions.length;
  const answeredCount = useMemo(
    () => careerQuizQuestions.filter((question) => Boolean(answers[question.id])).length,
    [answers]
  );
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: quizHistory = [] } = useQuery({
    queryKey: ["careerQuizzes"],
    queryFn: () => careerVision.entities.CareerQuiz.list("-created_date"),
    enabled: Boolean(user),
  });

  const submitMutation = useMutation({
    mutationFn: ({ payload }) => careerVision.entities.CareerQuiz.create(payload),
    onSuccess: (record, variables) => {
      setResult({ ...variables.outcome, recordId: record.id });
      queryClient.invalidateQueries({ queryKey: ["careerQuizzes"] });
    },
  });

  const currentQuestion = careerQuizQuestions[currentIndex];

  const handleSelectOption = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    setValidationError(null);
    if (result) {
      setResult(null);
    }
  };

  const goToNextQuestion = () => {
    if (!answers[currentQuestion.id]) {
      setValidationError("Please choose an option before continuing.");
      return;
    }
    setValidationError(null);
    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  };

  const goToPreviousQuestion = () => {
    setValidationError(null);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setValidationError(null);
  };

  const handleSubmit = () => {
    if (answeredCount !== totalQuestions) {
      setValidationError("Answer every question to unlock the full recommendation.");
      return;
    }

    const outcome = calculateOutcome(answers);
    const payload = {
      type: "career_path",
      answers,
      dimensionScores: outcome.dimensionBreakdown.reduce((acc, entry) => {
        acc[entry.id] = entry.score;
        return acc;
      }, {}),
      orderedDimensions: outcome.dimensionBreakdown.map(({ id, score }) => ({ id, score })),
      recommendedCategories: outcome.recommendedCategories,
      recommendedDomains: outcome.recommendedDomains.map((domain) => ({
        id: domain.id,
        name: domain.name,
        category: domain.category,
        description: domain.description,
        avgSalary: domain.avgSalary,
        growth: domain.growth,
        rating: domain.rating,
        future: domain.future,
        skills: domain.skills,
      })),
      insightSummary: outcome.summary,
      completed_at: outcome.completedAt,
    };

    submitMutation.mutate({ payload, outcome });
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-blue-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card className="border-none shadow-lg bg-white/90 backdrop-blur">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-slate-900">Career Focus Quiz</CardTitle>
                  <p className="text-slate-600">
                    Answer {totalQuestions} scenario-based questions to reveal the domains that fit your strengths.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-purple-100 text-purple-700 border border-purple-200">
                  <Clock className="w-4 h-4 mr-1" />
                  10-15 min
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                  <Target className="w-4 h-4 mr-1" />
                  Personalized Insights
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-slate-600 mb-2">
                <span>
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span>{progress}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <Badge variant="secondary" className="uppercase tracking-wide text-xs bg-slate-100">
                  {formatTopic(currentQuestion.topic)}
                </Badge>
                {validationError && (
                  <span className="text-sm text-red-600 font-medium">{validationError}</span>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 leading-snug">
                {currentQuestion.prompt}
              </h2>
              <div className="grid gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                      className={cn(
                        "w-full text-left rounded-2xl border transition-all duration-200 px-5 py-4",
                        "hover:border-purple-400 hover:shadow-md",
                        isSelected
                          ? "border-purple-500 bg-purple-50 shadow-lg shadow-purple-200 text-purple-900"
                          : "border-slate-200 bg-white text-slate-700"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border",
                            isSelected ? "border-4 border-purple-500" : "border-slate-300"
                          )}
                        />
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={goToPreviousQuestion}
                  disabled={currentIndex === 0 || submitMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  onClick={resetQuiz}
                  disabled={answeredCount === 0 || submitMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Start Over
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={goToNextQuestion}
                  disabled={currentIndex === totalQuestions - 1 || submitMutation.isPending}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {submitMutation.isPending ? "Scoring..." : "See Recommendations"}
                  {!submitMutation.isPending && <Sparkles className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-none shadow-xl bg-white/95 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl text-slate-900">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                Personalized Guidance
              </CardTitle>
              <p className="text-slate-600 text-sm">Generated {formatDate(result.completedAt)}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-wide opacity-80">Top Strength</p>
                    <h3 className="text-2xl font-semibold">
                      {result.topDimension?.label || "Keep exploring"}
                    </h3>
                  </div>
                  <Badge className="bg-white/20 border-white/30 text-white">
                    {answeredCount}/{totalQuestions} answered
                  </Badge>
                </div>
                <p className="mt-4 text-sm leading-relaxed">{result.summary}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      Strength Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.dimensionBreakdown.map((entry) => (
                      <div key={entry.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                          <span>{entry.label}</span>
                          <span>{entry.percentage}%</span>
                        </div>
                        <Progress value={entry.percentage} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-blue-600" />
                      Recommended Focus Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {result.recommendedCategories.map((category) => (
                        <Badge key={category} className="bg-blue-50 text-blue-700 border border-blue-200">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    {result.topDimension?.details && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-700">
                          {result.topDimension.details.title}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {result.topDimension.details.summary}
                        </p>
                        <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                          {result.topDimension.details.nextSteps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {result.recommendedDomains.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Top Domain Matches
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {result.recommendedDomains.map((domain) => (
                      <Card key={domain.id} className="border border-slate-200 hover:border-purple-300 transition-shadow hover:shadow-md">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-semibold text-slate-900">
                            {domain.name}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                            <Badge variant="secondary" className="bg-slate-100">
                              {domain.category}
                            </Badge>
                            <span>Growth {domain.growth}</span>
                            <span>Avg salary {domain.avgSalary}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-slate-600">
                          <p>{domain.description}</p>
                          <div>
                            <p className="font-medium text-slate-700 mb-1">Core strengths to amplify</p>
                            <div className="flex flex-wrap gap-2">
                              {domain.skills.slice(0, 4).map((skill) => (
                                <Badge key={skill} variant="outline" className="border-slate-200">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500">Future outlook: {domain.future}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-between gap-3">
                <Button
                  variant="outline"
                  onClick={() => setResult(null)}
                  className="flex items-center gap-2"
                >
                  Adjust Answers
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate(createPageUrl("DomainSet"))}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2"
                >
                  Explore Domain Library
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {quizHistory.length > 0 && (
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                <History className="w-5 h-5 text-slate-500" />
                Previous quiz runs
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-slate-100">
              {quizHistory.map((entry) => {
                const top = entry.orderedDimensions?.[0]?.id;
                const label = DIMENSION_LABELS[top] || top || "N/A";
                return (
                  <div key={entry.id} className="py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{formatDate(entry.completed_at || entry.created_date)}</p>
                      <p className="text-sm text-slate-600 max-w-2xl">
                        {entry.insightSummary || "Completed quiz session"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Badge variant="outline" className="border-purple-200 text-purple-700">
                        {label}
                      </Badge>
                      {(entry.recommendedCategories || []).slice(0, 3).map((category) => (
                        <Badge key={category} className="bg-slate-100 text-slate-700">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
