import React from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Target, TrendingUp, MessageSquare, CheckCircle, Clock, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: goals = [] } = useQuery({
    queryKey: ['goals'],
    queryFn: () => careerVision.entities.CareerGoal.filter({ created_by: user?.email }, '-created_date'),
    enabled: !!user,
  });

  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const inProgressGoals = goals.filter(g => g.status === 'in_progress').length;
  const avgProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, g) => sum + (g.progress || 0), 0) / goals.length) 
    : 0;

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 rounded-3xl p-8 md:p-10 text-white shadow-2xl shadow-purple-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Welcome back, {user?.full_name?.split(' ')[0] || 'there'}!
              </h1>
            </div>
            <p className="text-purple-100 text-lg mb-6">
              {user?.current_role 
                ? `${user.current_role}${user.company ? ` at ${user.company}` : ''}`
                : "Ready to advance your career journey?"}
            </p>
            <Link to={createPageUrl("Chat")}> 
              <Button className="bg-white text-purple-600 hover:bg-purple-50 font-semibold shadow-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Chat with AI Advisor
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Goals</CardTitle>
              <Target className="w-5 h-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{goals.length}</div>
              <p className="text-xs text-slate-500 mt-1">
                {inProgressGoals} in progress
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Completed</CardTitle>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{completedGoals}</div>
              <p className="text-xs text-slate-500 mt-1">
                {goals.length > 0 ? Math.round((completedGoals / goals.length) * 100) : 0}% success rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Avg Progress</CardTitle>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{avgProgress}%</div>
              <Progress value={avgProgress} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Goals Overview */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Goals */}
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-900">Recent Goals</CardTitle>
                <Link to={createPageUrl("Goals")}> 
                  <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {goals.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 mb-4">No goals yet</p>
                  <Link to={createPageUrl("Goals")}> 
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      Create Your First Goal
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {goals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-slate-900">{goal.title}</h3>
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${goal.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                          ${goal.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : ''}
                          ${goal.status === 'not_started' ? 'bg-slate-100 text-slate-700' : ''}
                          ${goal.status === 'on_hold' ? 'bg-yellow-100 text-yellow-700' : ''}
                        `}>
                          {goal.status.replace('_', ' ')}
                        </span>
                      </div>
                      <Progress value={goal.progress || 0} className="h-2 mb-2" />
                      <p className="text-xs text-slate-500">{goal.progress || 0}% complete</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to={createPageUrl("Chat")} className="block">
                <Button className="w-full justify-start bg-white hover:bg-purple-50 text-slate-900 border border-purple-200 shadow-sm h-auto py-4">
                  <MessageSquare className="w-5 h-5 mr-3 text-purple-600" />
                  <div className="text-left">
                    <div className="font-semibold">Get Career Advice</div>
                    <div className="text-xs text-slate-500">Chat with AI advisor</div>
                  </div>
                </Button>
              </Link>

              <Link to={createPageUrl("Goals")} className="block">
                <Button className="w-full justify-start bg-white hover:bg-blue-50 text-slate-900 border border-blue-200 shadow-sm h-auto py-4">
                  <Target className="w-5 h-5 mr-3 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold">Set New Goal</div>
                    <div className="text-xs text-slate-500">Define your career objectives</div>
                  </div>
                </Button>
              </Link>

              <Link to={createPageUrl("Profile")} className="block">
                <Button className="w-full justify-start bg-white hover:bg-green-50 text-slate-900 border border-green-200 shadow-sm h-auto py-4">
                  <TrendingUp className="w-5 h-5 mr-3 text-green-600" />
                  <div className="text-left">
                    <div className="font-semibold">Update Profile</div>
                    <div className="text-xs text-slate-500">Keep your info current</div>
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}