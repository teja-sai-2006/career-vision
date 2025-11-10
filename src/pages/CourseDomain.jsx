import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Layers,
  ListChecks,
  Play,
  Plus,
  Sparkle,
  Users,
} from "lucide-react";
import { careerVision } from "@/api/careerVisionClient";
import { createPageUrl } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { learningCatalog } from "@/data/learningCatalog";

function getYouTubeEmbed(url) {
  if (!url) return null;
  try {
    const youTubeHosts = ["youtube.com", "youtu.be", "www.youtube.com", "m.youtube.com"];
    const parsed = new URL(url);
    if (!youTubeHosts.includes(parsed.hostname)) return null;
    let videoId = parsed.searchParams.get("v");
    if (!videoId && parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.replace("/", "");
    }
    if (!videoId && parsed.pathname.includes("/embed/")) {
      videoId = parsed.pathname.split("/embed/")[1];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (error) {
    return null;
  }
}

function buildGoalNotes(track) {
  const lines = [
    `Track: ${track.name}`,
    "",
    "Videos:",
    ...track.videos.map((video, index) => `${index + 1}. ${video.title} - ${video.url}`),
    "",
    "Courses:",
    ...track.courses.map((course, index) => `${index + 1}. ${course.title} (${course.provider}) - ${course.url}`),
    "",
    "Books & References:",
    ...track.books.map((book, index) => `${index + 1}. ${book.title} - ${book.url}`),
    "",
    "Milestones:",
    ...track.path.map((step, index) => `${index + 1}. ${step.title}: ${step.detail}`),
  ];

  return lines.join("\n");
}

function addDaysToIso(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export default function CourseDomain() {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => careerVision.auth.me(),
  });

  const domain = useMemo(() => learningCatalog.find((item) => item.id === domainId), [domainId]);
  const [selectedTrackId, setSelectedTrackId] = useState(domain?.tracks[0]?.id || null);

  useEffect(() => {
    if (!domain) return;
    const defaultTrackId = domain.tracks[0]?.id || null;
    if (!domain.tracks.some((track) => track.id === selectedTrackId)) {
      setSelectedTrackId(defaultTrackId);
    }
  }, [domain, selectedTrackId]);

  const selectedTrack = useMemo(() => {
    if (!domain) return undefined;
    return domain.tracks.find((track) => track.id === selectedTrackId) || domain.tracks[0];
  }, [domain, selectedTrackId]);

  const [goalFeedback, setGoalFeedback] = useState(null);

  const addGoalMutation = useMutation({
  mutationFn: (payload) => careerVision.entities.CareerGoal.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      setGoalFeedback({ type: "success", message: "Learning path added to your goals." });
    },
    onError: () => {
      setGoalFeedback({ type: "error", message: "Something went wrong while adding the goal." });
    },
  });

  useEffect(() => {
    if (!goalFeedback) return undefined;
    const timeout = setTimeout(() => setGoalFeedback(null), 5000);
    return () => clearTimeout(timeout);
  }, [goalFeedback]);

  const handleAddToGoals = () => {
    if (!selectedTrack) return;
    if (!user) {
      navigate(`${createPageUrl("Auth")}?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    const payload = {
      title: `Complete ${selectedTrack.name}`,
      description: selectedTrack.headline,
      category: "learning",
      status: "not_started",
      priority: "medium",
      target_date: addDaysToIso(60),
      progress: 0,
      notes: buildGoalNotes(selectedTrack),
    };

    addGoalMutation.mutate(payload);
  };

  if (!domain) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-blue-50 p-6 md:p-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
          <Card className="border-none bg-white/90 shadow-xl">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl text-slate-900">Domain not found</CardTitle>
              <p className="text-sm text-slate-600">
                The learning domain you were looking for does not exist or was recently renamed.
              </p>
              <Button onClick={() => navigate("/courses")}>Return to courses</Button>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  const Icon = domain.icon;
  const featuredVideo = getYouTubeEmbed(selectedTrack?.videos[0]?.url);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-blue-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            className="w-fit gap-2 text-slate-600 hover:text-slate-900"
            onClick={() => navigate("/courses")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to domains
          </Button>

          <Card className="border-none bg-white/90 shadow-xl">
            <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${domain.gradient} text-white`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <Badge className="bg-purple-100 text-purple-700">Domain overview</Badge>
                  <h1 className="text-3xl font-semibold text-slate-900">{domain.name}</h1>
                  <p className="max-w-2xl text-sm text-slate-600">{domain.summary}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="rounded-2xl border border-purple-100 bg-purple-50/70 px-4 py-3 text-sm">
                  <p className="text-xs uppercase tracking-wider text-purple-500">Tracks</p>
                  <p className="text-lg font-semibold text-purple-700">{domain.metrics.tracks}</p>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-sm">
                  <p className="text-xs uppercase tracking-wider text-blue-500">Guided hours</p>
                  <p className="text-lg font-semibold text-blue-700">{domain.metrics.hours}</p>
                </div>
                <div className="rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3 text-sm">
                  <p className="text-xs uppercase tracking-wider text-rose-500">Resources</p>
                  <p className="text-lg font-semibold text-rose-700">{domain.metrics.resources}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-6">
            <Card className="border-none bg-white/90 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-slate-900">Subdomains</CardTitle>
                    <p className="text-sm text-slate-500">Select a learning path to view the full breakdown.</p>
                  </div>
                  <Layers className="h-5 w-5 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {domain.tracks.map((track) => {
                  const active = track.id === selectedTrack?.id;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setSelectedTrackId(track.id)}
                      className={`w-full rounded-2xl border bg-white/70 p-4 text-left transition hover:border-purple-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                        active ? "border-purple-300 shadow-md" : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-slate-900">{track.name}</p>
                          <p className="mt-1 line-clamp-2 text-sm text-slate-600">{track.headline}</p>
                        </div>
                        {active && <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-purple-500" />}
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-none bg-white/90 shadow-lg">
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg text-slate-900">How this works</CardTitle>
                <p className="text-sm text-slate-600">
                  Follow the playlist, ship the projects, and log progress through Career Vision goals to celebrate milestones.
                </p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-purple-500" />
                  Curated to stay in sync with hiring demand.
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  Built to share artifacts with mentors and peers.
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  Pace each milestone to match your available time.
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none bg-white/90 shadow-xl">
            <CardHeader className="space-y-4 pb-0">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-purple-100 text-purple-700">{domain.name}</Badge>
                <Badge variant="outline" className="flex items-center gap-1 border-purple-200 text-purple-600">
                  <BadgeCheck className="h-3 w-3" /> guided path
                </Badge>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl text-slate-900">{selectedTrack?.name}</CardTitle>
                <p className="text-base text-slate-600">{selectedTrack?.headline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(selectedTrack?.tags || []).map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-700">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAddToGoals}
                  disabled={addGoalMutation.isPending}
                  className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
                >
                  {addGoalMutation.isPending ? "Adding..." : "Add to goals"}
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-purple-200 hover:bg-purple-50"
                  onClick={() => window.open(selectedTrack?.videos[0]?.url, "_blank")}
                >
                  <Sparkle className="h-4 w-4 text-purple-500" />
                  Quick preview
                </Button>
              </div>
              {goalFeedback && (
                <div
                  className={`rounded-xl px-4 py-2 text-sm ${
                    goalFeedback.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {goalFeedback.message}
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-10 pt-6">
              {selectedTrack?.description && (
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Sparkle className="h-5 w-5 text-purple-500" />
                    Why this path matters
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{selectedTrack.description}</p>
                </div>
              )}

              {featuredVideo && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Play className="h-5 w-5 text-purple-500" />
                    Featured lesson
                  </h3>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                    <div className="aspect-video w-full">
                      <iframe
                        src={featuredVideo}
                        title={selectedTrack?.videos[0]?.title}
                        className="h-full w-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Play className="h-5 w-5 text-purple-500" />
                    YouTube playlist
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-slate-400">
                    {selectedTrack?.videos.length || 0} videos
                  </span>
                </div>
                <div className="space-y-3">
                  {selectedTrack?.videos.map((video) => (
                    <div key={video.url} className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                      <p className="font-medium text-slate-900">{video.title}</p>
                      <p className="text-xs text-slate-500">{video.duration}</p>
                      <Button
                        variant="ghost"
                        className="mt-3 gap-2 text-purple-600 hover:bg-purple-50"
                        onClick={() => window.open(video.url, "_blank")}
                      >
                        Watch video
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <GraduationCap className="h-5 w-5 text-purple-500" />
                    Courses & labs
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-slate-400">
                    {selectedTrack?.courses.length || 0} courses
                  </span>
                </div>
                <div className="space-y-3">
                  {selectedTrack?.courses.map((course) => (
                    <div key={course.url} className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                      <p className="font-medium text-slate-900">{course.title}</p>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{course.provider}</p>
                      <p className="mt-2 text-sm text-slate-600">{course.summary}</p>
                      <Button
                        variant="ghost"
                        className="mt-3 gap-2 text-purple-600 hover:bg-purple-50"
                        onClick={() => window.open(course.url, "_blank")}
                      >
                        Open course
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    Library resources
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-slate-400">
                    {selectedTrack?.books.length || 0} references
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {selectedTrack?.books.map((book) => (
                    <div key={book.url} className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                      <p className="font-medium text-slate-900">{book.title}</p>
                      <p className="text-xs text-slate-500">{book.author}</p>
                      <Button
                        variant="ghost"
                        className="mt-3 gap-2 text-purple-600 hover:bg-purple-50"
                        onClick={() => window.open(book.url, "_blank")}
                      >
                        View resource
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <ListChecks className="h-5 w-5 text-purple-500" />
                    Milestone path
                  </h3>
                  <span className="text-xs uppercase tracking-wide text-slate-400">
                    {selectedTrack?.path.length || 0} stages
                  </span>
                </div>
                <ol className="space-y-3">
                  {selectedTrack?.path.map((step, index) => (
                    <li key={step.title} className="rounded-2xl border border-purple-100 bg-purple-50/60 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{step.title}</p>
                          <p className="text-sm text-slate-600">{step.detail}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  className="gap-2 text-purple-600 hover:bg-purple-50"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Back to top
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
