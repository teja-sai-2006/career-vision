import React, { useState } from "react";
import { careerVision } from "@/api/careerVisionClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Target } from "lucide-react";
import GoalCard from "../components/goals/GoalCard";
import GoalForm from "../components/goals/GoalForm";

export default function Goals() {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => careerVision.auth.me(),
  });

  const { data: goals = [] } = useQuery({
    queryKey: ['goals'],
    queryFn: () => careerVision.entities.CareerGoal.filter({ created_by: user?.email }, '-created_date'),
    enabled: !!user,
  });

  const createGoalMutation = useMutation({
  mutationFn: (goalData) => careerVision.entities.CareerGoal.create(goalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setShowForm(false);
      setEditingGoal(null);
    },
  });

  const updateGoalMutation = useMutation({
  mutationFn: ({ id, goalData }) => careerVision.entities.CareerGoal.update(id, goalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setShowForm(false);
      setEditingGoal(null);
    },
  });

  const deleteGoalMutation = useMutation({
  mutationFn: (id) => careerVision.entities.CareerGoal.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  const handleSubmit = async (goalData) => {
    if (editingGoal) {
      updateGoalMutation.mutate({ id: editingGoal.id, goalData });
    } else {
      createGoalMutation.mutate(goalData);
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      deleteGoalMutation.mutate(id);
    }
  };

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              My Career Goals
            </h1>
            <p className="text-slate-600 mt-1">Track and achieve your professional objectives</p>
          </div>
          <Button
            onClick={() => {
              setEditingGoal(null);
              setShowForm(!showForm);
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Goal Form */}
        {showForm && (
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">
                {editingGoal ? 'Edit Goal' : 'Create New Goal'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GoalForm
                goal={editingGoal}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingGoal(null);
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Goals Grid */}
        {goals.length === 0 ? (
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="py-16">
              <div className="text-center">
                <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No goals yet</h3>
                <p className="text-slate-600 mb-6">
                  Start your career journey by setting your first goal!
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onUpdateProgress={(id, progress) => 
                  updateGoalMutation.mutate({ id, goalData: { ...goal, progress } })
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}