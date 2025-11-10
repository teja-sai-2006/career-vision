export const CareerQuizSchema = {
  name: "CareerQuiz",
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["career_path"],
      default: "career_path",
      description: "Type of quiz that was completed",
    },
    answers: {
      type: "object",
      additionalProperties: {
        type: "string",
      },
      description: "Map of question identifiers to the selected option identifier",
    },
    dimensionScores: {
      type: "object",
      additionalProperties: {
        type: "number",
      },
      description: "Aggregated scores for each aptitude dimension",
    },
    orderedDimensions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Dimension identifier",
          },
          score: {
            type: "number",
            description: "Total score for the dimension",
          },
        },
        required: ["id", "score"],
      },
      description: "Ordered list of dimensions ranked by score",
    },
    recommendedCategories: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Career categories that align with quiz results",
    },
    recommendedDomains: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          category: { type: "string" },
          description: { type: "string" },
          avgSalary: { type: "string" },
          growth: { type: "string" },
          rating: { type: "string" },
          future: { type: "string" },
          skills: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["id", "name", "category"],
      },
      description: "Recommended domains curated from the catalog",
    },
    insightSummary: {
      type: "string",
      description: "Human readable summary of the quiz outcome",
    },
    completed_at: {
      type: "string",
      format: "date-time",
      description: "Timestamp when the quiz was completed",
    },
  },
  required: ["answers", "dimensionScores"],
};

export default CareerQuizSchema;
