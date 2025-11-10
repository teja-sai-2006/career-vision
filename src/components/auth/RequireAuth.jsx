import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { careerVision } from "@/api/careerVisionClient";

export default function RequireAuth({ children }) {
  const location = useLocation();

  const {
    data: session,
    isLoading: sessionLoading,
  } = useQuery({
    queryKey: ["session"],
    queryFn: () => careerVision.auth.session(),
  });

  const {
    data: user,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => careerVision.auth.me(),
    enabled: Boolean(session?.userId),
  });

  if (sessionLoading || (session?.userId && userLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!session?.userId || !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
