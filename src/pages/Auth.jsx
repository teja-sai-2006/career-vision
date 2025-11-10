import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { careerVision } from "@/api/careerVisionClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const DEFAULT_CREDENTIALS = {
  name: "Teja Sai",
  email: "tejasai13052006@gmail.com",
  password: "12345678",
};

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const fromPath = useMemo(() => location.state?.from?.pathname || "/", [location.state]);

  const {
    data: session,
    isLoading: sessionLoading,
  } = useQuery({
    queryKey: ["session"],
    queryFn: () => careerVision.auth.session(),
  });

  const {
    data: currentUser,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => careerVision.auth.me(),
    enabled: Boolean(session?.userId),
  });

  const [authMode, setAuthMode] = useState("login");

  const [loginForm, setLoginForm] = useState({
    email: DEFAULT_CREDENTIALS.email,
    password: DEFAULT_CREDENTIALS.password,
  });
  const [loginError, setLoginError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirm, setShowRegisterConfirm] = useState(false);

  useEffect(() => {
    if (!sessionLoading && !userLoading && session?.userId && currentUser) {
      navigate(fromPath, { replace: true });
    }
  }, [sessionLoading, userLoading, session, currentUser, fromPath, navigate]);

  const invalidateAll = () => {
    queryClient.invalidateQueries({ predicate: () => true });
  };

  const loginMutation = useMutation({
  mutationFn: (payload) => careerVision.auth.login(payload),
    onSuccess: () => {
      invalidateAll();
      navigate(fromPath, { replace: true });
    },
    onError: (error) => {
      setLoginError(error?.message || "Unable to sign in. Please try again.");
    },
  });

  const registerMutation = useMutation({
  mutationFn: (payload) => careerVision.auth.register(payload),
    onSuccess: () => {
      invalidateAll();
      navigate(fromPath, { replace: true });
    },
    onError: (error) => {
      setRegisterError(error?.message || "Unable to create your account. Please try again.");
    },
  });

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setLoginError("");

    loginMutation.mutate({
      email: loginForm.email.trim(),
      password: loginForm.password,
    });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    setRegisterError("");

    if (!registerForm.full_name.trim()) {
      setRegisterError("Please enter your name.");
      return;
    }

    if (registerForm.password !== registerForm.confirm) {
      setRegisterError("Passwords do not match.");
      return;
    }

    registerMutation.mutate({
      full_name: registerForm.full_name.trim(),
      email: registerForm.email.trim(),
      password: registerForm.password,
    });
  };

  const isAuthLoading =
    sessionLoading || userLoading || loginMutation.isPending || registerMutation.isPending;

  if ((session?.userId && currentUser) || (sessionLoading && userLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-slate-50 to-blue-50">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50 p-4 sm:p-6 lg:p-10">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_1fr]">
        <Card className="border-none bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/20">
          <CardHeader className="space-y-6 p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-purple-100/80">Career Vision</p>
                <CardTitle className="text-3xl font-semibold">Plan your career with clarity</CardTitle>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-purple-100">
              Access your personalised dashboard to track goals, opportunities, assessments, and AI conversations – all tailored to your professional journey.
            </p>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="rounded-2xl bg-white/10 p-6">
              <p className="text-xs uppercase tracking-wide text-purple-200">Demo Account</p>
              <h3 className="mt-2 text-xl font-semibold">Preloaded Profile</h3>
              <p className="mt-2 text-sm text-purple-100/90">
                Sign in with the default account to explore the sample career data we prepared for Teja Sai.
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                  <span>{DEFAULT_CREDENTIALS.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                  <span>{DEFAULT_CREDENTIALS.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                  <span>Password: {DEFAULT_CREDENTIALS.password}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 rounded-2xl bg-white/10 p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-100" />
                <p className="text-sm font-medium">Your data stays on this device only.</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-100/90">
                <ArrowRight className="h-4 w-4" />
                <span>Switch between sign in and sign up to add your own profile.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-white/90 shadow-xl shadow-purple-500/10 backdrop-blur">
          <CardHeader className="space-y-2 p-6">
            <CardTitle className="text-2xl font-semibold text-slate-900">
              {authMode === "login" ? "Welcome back" : "Create your account"}
            </CardTitle>
            <p className="text-sm text-slate-600">
              {authMode === "login"
                ? "Sign in to manage your personalised career workspace."
                : "Register to start tracking your goals, skills, and job search."}
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={authMode} onValueChange={setAuthMode} className="space-y-6">
              <TabsList className="w-full justify-between">
                <TabsTrigger value="login" className="flex-1">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className="flex-1">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginForm.email}
                      onChange={(event) =>
                        setLoginForm((prev) => ({ ...prev, email: event.target.value }))
                      }
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showLoginPassword ? "text" : "password"}
                        value={loginForm.password}
                        onChange={(event) =>
                          setLoginForm((prev) => ({ ...prev, password: event.target.value }))
                        }
                        autoComplete="current-password"
                        required
                        className="pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
                        aria-label={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{loginError}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                    disabled={loginMutation.isPending || isAuthLoading}
                  >
                    {loginMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      value={registerForm.full_name}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({ ...prev, full_name: event.target.value }))
                      }
                      placeholder="e.g. Jordan Patel"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerForm.email}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({ ...prev, email: event.target.value }))
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showRegisterPassword ? "text" : "password"}
                        value={registerForm.password}
                        onChange={(event) =>
                          setRegisterForm((prev) => ({ ...prev, password: event.target.value }))
                        }
                        autoComplete="new-password"
                        required
                        className="pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
                        aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                      >
                        {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="register-confirm"
                        type={showRegisterConfirm ? "text" : "password"}
                        value={registerForm.confirm}
                        onChange={(event) =>
                          setRegisterForm((prev) => ({ ...prev, confirm: event.target.value }))
                        }
                        autoComplete="new-password"
                        required
                        className="pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterConfirm((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
                        aria-label={showRegisterConfirm ? "Hide password" : "Show password"}
                      >
                        {showRegisterConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {registerError && (
                    <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{registerError}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                    disabled={registerMutation.isPending || isAuthLoading}
                  >
                    {registerMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-8 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">Need the demo login?</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {DEFAULT_CREDENTIALS.email}
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  password: {DEFAULT_CREDENTIALS.password}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
