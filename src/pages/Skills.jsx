import React, { useState } from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, TrendingUp } from "lucide-react";
import SkillCard from "../components/skills/SkillCard";
import SkillForm from "../components/skills/SkillForm";

export default function Skills() {
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: skills = [] } = useQuery({
    queryKey: ['skills'],
    queryFn: () => careerVision.entities.Skill.filter({ created_by: user?.email }, '-created_date'),
    enabled: !!user,
  });

  const createSkillMutation = useMutation({
  mutationFn: (data) => careerVision.entities.Skill.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      setShowForm(false);
      setEditingSkill(null);
    },
  });

  const updateSkillMutation = useMutation({
  mutationFn: ({ id, data }) => careerVision.entities.Skill.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      setShowForm(false);
      setEditingSkill(null);
    },
  });

  const deleteSkillMutation = useMutation({
  mutationFn: (id) => careerVision.entities.Skill.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
  });

  const handleSubmit = async (data) => {
    if (editingSkill) {
      updateSkillMutation.mutate({ id: editingSkill.id, data });
    } else {
      createSkillMutation.mutate(data);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Skills Tracker
            </h1>
            <p className="text-slate-600 mt-1">Track and improve your professional skills</p>
          </div>
          <Button
            onClick={() => {
              setEditingSkill(null);
              setShowForm(!showForm);
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Skill
          </Button>
        </div>

        {/* Skill Form */}
        {showForm && (
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SkillForm
                skill={editingSkill}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingSkill(null);
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Skills by Category */}
        {skills.length === 0 ? (
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="py-16">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No skills tracked yet</h3>
                <p className="text-slate-600 mb-6">Start tracking your skills and monitor your progress!</p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Skill
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-slate-900 mb-4 capitalize">
                {category.replace('_', ' ')}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onEdit={(skill) => {
                      setEditingSkill(skill);
                      setShowForm(true);
                    }}
                    onDelete={(id) => {
                      if (window.confirm('Are you sure?')) {
                        deleteSkillMutation.mutate(id);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}