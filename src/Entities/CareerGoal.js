// CareerGoal entity definition
export const CareerGoalSchema = {
  name: "CareerGoal",
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Goal title"
    },
    description: {
      type: "string",
      description: "Detailed description of the goal"
    },
    category: {
      type: "string",
      enum: [
        "skill_development",
        "education",
        "networking",
        "job_search",
        "promotion",
        "career_change",
        "work_life_balance",
        "other"
      ],
      description: "Category of the career goal"
    },
    status: {
      type: "string",
      enum: [
        "not_started",
        "in_progress",
        "completed",
        "on_hold"
      ],
      default: "not_started",
      description: "Current status of the goal"
    },
    priority: {
      type: "string",
      enum: ["low", "medium", "high"],
      default: "medium",
      description: "Priority level"
    },
    target_date: {
      type: "string",
      format: "date",
      description: "Target completion date"
    },
    progress: {
      type: "number",
      minimum: 0,
      maximum: 100,
      default: 0,
      description: "Progress percentage"
    },
    notes: {
      type: "string",
      description: "Additional notes or action items"
    }
  },
  required: ["title", "category"]
};

export default CareerGoalSchema;
