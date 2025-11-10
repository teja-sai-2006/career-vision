import React, { useState } from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Building, TrendingUp, Save, X } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    current_role: user?.current_role || "",
    company: user?.company || "",
    years_experience: user?.years_experience || 0,
    industry: user?.industry || "",
    skills: user?.skills || [],
    career_interests: user?.career_interests || [],
    bio: user?.bio || ""
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        current_role: user.current_role || "",
        company: user.company || "",
        years_experience: user.years_experience || 0,
        industry: user.industry || "",
        skills: user.skills || [],
        career_interests: user.career_interests || [],
        bio: user.bio || ""
      });
    }
  }, [user]);

  const updateProfileMutation = useMutation({
  mutationFn: (data) => careerVision.auth.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      setIsEditing(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const addInterest = () => {
    if (interestInput.trim() && !formData.career_interests.includes(interestInput.trim())) {
      setFormData({
        ...formData,
        career_interests: [...formData.career_interests, interestInput.trim()]
      });
      setInterestInput("");
    }
  };

  const removeInterest = (interest) => {
    setFormData({
      ...formData,
      career_interests: formData.career_interests.filter(i => i !== interest)
    });
  };

  if (!user) return null;

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-slate-600 mt-1">Manage your professional information</p>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Card */}
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <CardTitle className="text-2xl">{user.full_name}</CardTitle>
                <p className="text-purple-100">{user.email}</p>
                <Badge className="mt-2 bg-white/20 text-white border-white/30">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="current_role">Current Role</Label>
                    <Input
                      id="current_role"
                      value={formData.current_role}
                      onChange={(e) => setFormData({ ...formData, current_role: e.target.value })}
                      placeholder="e.g., Software Developer"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g., Tech Corp"
                    />
                  </div>
                  <div>
                    <Label htmlFor="years_experience">Years of Experience</Label>
                    <Input
                      id="years_experience"
                      type="number"
                      value={formData.years_experience}
                      onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g., Technology"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about your career journey..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Skills</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      placeholder="Add a skill..."
                    />
                    <Button type="button" onClick={addSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, idx) => (
                      <Badge key={idx} className="bg-purple-100 text-purple-700 border-purple-200">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-purple-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Career Interests</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                      placeholder="Add an interest..."
                    />
                    <Button type="button" onClick={addInterest}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.career_interests.map((interest, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-700 border-blue-200">
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="ml-2 hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="text-sm text-slate-500">Current Role</p>
                        <p className="font-semibold text-slate-900">
                          {user.current_role || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm text-slate-500">Company</p>
                        <p className="font-semibold text-slate-900">
                          {user.company || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <p className="text-sm text-slate-500">Experience</p>
                        <p className="font-semibold text-slate-900">
                          {user.years_experience || 0} years
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <p className="text-sm text-slate-500">Industry</p>
                        <p className="font-semibold text-slate-900">
                          {user.industry || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {user.bio && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Bio</p>
                    <p className="text-slate-700 leading-relaxed">{user.bio}</p>
                  </div>
                )}

                {user.skills && user.skills.length > 0 && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, idx) => (
                        <Badge key={idx} className="bg-purple-100 text-purple-700 border-purple-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {user.career_interests && user.career_interests.length > 0 && (
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Career Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {user.career_interests.map((interest, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-700 border-blue-200">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}