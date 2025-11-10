import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  MessageSquare,
  Target,
  User,
  LogOut,
  Sparkles,
  Briefcase,
  GraduationCap,
  BookOpen,
  FileText,
  TrendingUp,
  ClipboardCheck,
  Award,
  Compass,
  ListChecks,
} from "lucide-react";
import { careerVision } from "@/api/careerVisionClient";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "AI Advisor",
    url: createPageUrl("Chat"),
    icon: MessageSquare,
  },
  {
    title: "My Goals",
    url: createPageUrl("Goals"),
    icon: Target,
  },
  {
    title: "Job Search",
    url: createPageUrl("JobApplications"),
    icon: Briefcase,
  },
  {
    title: "Interviews",
    url: createPageUrl("Interviews"),
    icon: BookOpen,
  },
  {
    title: "Skills",
    url: createPageUrl("Skills"),
    icon: TrendingUp,
  },
  {
    title: "Domain Set",
    url: createPageUrl("DomainSet"),
    icon: Compass,
  },
  {
    title: "Courses",
    url: createPageUrl("Courses"),
    icon: GraduationCap,
  },
  {
    title: "Assessments",
    url: createPageUrl("Assessments"),
    icon: ClipboardCheck,
  },
  {
    title: "Quizzes",
    url: createPageUrl("Quizzes"),
    icon: ListChecks,
  },
  {
    title: "Results",
    url: createPageUrl("AssessmentResults"),
    icon: Award,
  },
  {
    title: "Documents",
    url: createPageUrl("Documents"),
    icon: FileText,
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: User,
  },
];

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await careerVision.auth.logout();
    } catch (error) {
      console.error("Failed to logout", error);
    } finally {
      queryClient.setQueryData(["session"], null);
      queryClient.setQueryData(["currentUser"], null);
      queryClient.invalidateQueries({ predicate: () => true });
      navigate("/auth", { replace: true });
    }
  };

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --primary-color: #667eea;
          --secondary-color: #764ba2;
          --accent-color: #f093fb;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50">
        <Sidebar className="border-r border-purple-100/50 bg-white/80 backdrop-blur-xl">
          <SidebarHeader className="border-b border-purple-100/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Career Vision
                </h2>
                <p className="text-xs text-slate-500">Your Career Companion</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`
                          hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 
                          transition-all duration-300 rounded-xl mb-1 group
                          ${location.pathname === item.url 
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30" 
                            : "text-slate-600"
                          }
                        `}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon
                            className={`w-5 h-5 ${
                              location.pathname === item.url
                                ? "text-white"
                                : "text-slate-400 group-hover:text-purple-600"
                            }`}
                          />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-purple-100/50 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-600" />
              <span className="font-medium group-hover:text-red-600">Logout</span>
            </button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-xl border-b border-purple-100/50 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-purple-50 p-2 rounded-xl transition-colors duration-300" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Career Vision
                </h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
