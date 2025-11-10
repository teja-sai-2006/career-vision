import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import App from "./App.jsx";
import Dashboard from "@/pages/dashboard.jsx";
import Chat from "@/pages/chat.jsx";
import Goals from "@/pages/Goals.jsx";
import JobApplications from "@/pages/JobApplications.jsx";
import Interviews from "@/pages/Interviews.jsx";
import Skills from "@/pages/Skills.jsx";
import Assessments from "@/pages/Assessments.jsx";
import AssessmentSubdomains from "@/pages/AssessmentSubdomains.jsx";
import AssessmentWebsites from "@/pages/AssessmentWebsites.jsx";
import AssessmentResults from "@/pages/AssessmentResults.jsx";
import Documents from "@/pages/Documents.jsx";
import Profile from "@/pages/Profile.jsx";
import Courses from "@/pages/Courses.jsx";
import CourseDomain from "@/pages/CourseDomain.jsx";
import Auth from "@/pages/Auth.jsx";
import DomainSet from "@/pages/DomainSet.jsx";
import DomainLibrary from "@/pages/DomainLibrary.jsx";
import CareerQuiz from "@/pages/CareerQuiz.jsx";

const queryClient = new QueryClient();

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-slate-50 to-blue-50 p-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
        <p className="text-slate-600">
          The page you're looking for doesn't exist or was moved. Use the sidebar to navigate back to a known section.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="chat" element={<Chat />} />
            <Route path="goals" element={<Goals />} />
            <Route path="job-applications" element={<JobApplications />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="skills" element={<Skills />} />
            <Route path="domain-set" element={<DomainSet />} />
            <Route path="domain-set/:categoryId" element={<DomainLibrary />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:domainId" element={<CourseDomain />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="assessment-subdomains" element={<AssessmentSubdomains />} />
            <Route path="assessment-websites" element={<AssessmentWebsites />} />
            <Route path="assessment-results" element={<AssessmentResults />} />
            <Route path="quizzes" element={<CareerQuiz />} />
            <Route path="documents" element={<Documents />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
