// AssessmentWebsite entity definition
export const AssessmentWebsiteSchema = {
  name: "AssessmentWebsite",
  type: "object",
  properties: {
    subdomain_id: {
      type: "string",
      description: "Parent subdomain ID"
    },
    name: {
      type: "string",
      description: "Website/platform name"
    },
    url: {
      type: "string",
      description: "Assessment website URL"
    },
    description: {
      type: "string",
      description: "Brief description of the assessment"
    },
    difficulty: {
      type: "string",
      enum: [
        "beginner",
        "intermediate",
        "advanced",
        "mixed"
      ],
      description: "Difficulty level"
    },
    is_free: {
      type: "boolean",
      default: true,
      description: "Is the assessment free"
    }
  },
  required: ["subdomain_id", "name", "url"]
};

export default AssessmentWebsiteSchema;
