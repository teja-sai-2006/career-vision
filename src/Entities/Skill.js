// Skill entity definition
export const SkillSchema = {
  name: "Skill",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Skill name"
    },
    category: {
      type: "string",
      enum: [
        "technical",
        "soft_skill",
        "language",
        "tool",
        "framework",
        "management",
        "other"
      ],
      description: "Skill category"
    },
    proficiency: {
      type: "string",
      enum: [
        "beginner",
        "intermediate",
        "advanced",
        "expert"
      ],
      default: "beginner",
      description: "Current proficiency level"
    },
    years_experience: {
      type: "number",
      description: "Years of experience with this skill"
    },
    target_level: {
      type: "string",
      enum: [
        "beginner",
        "intermediate",
        "advanced",
        "expert"
      ],
      description: "Target proficiency level"
    },
    learning_resources: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Resources for learning this skill"
    },
    last_practiced: {
      type: "string",
      format: "date",
      description: "Last time this skill was practiced"
    },
    notes: {
      type: "string",
      description: "Additional notes about the skill"
    }
  },
  required: ["name", "category"]
};

export default SkillSchema;
