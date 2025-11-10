// AssessmentResult entity definition
export const AssessmentResultSchema = {
  name: "AssessmentResult",
  type: "object",
  properties: {
    website_id: {
      type: "string",
      description: "Assessment website ID"
    },
    domain_name: {
      type: "string",
      description: "Domain name (for quick reference)"
    },
    subdomain_name: {
      type: "string",
      description: "Subdomain name (for quick reference)"
    },
    website_name: {
      type: "string",
      description: "Website name (for quick reference)"
    },
    score_obtained: {
      type: "number",
      description: "Score obtained"
    },
    total_score: {
      type: "number",
      description: "Total possible score"
    },
    percentage: {
      type: "number",
      description: "Percentage score"
    },
    test_date: {
      type: "string",
      format: "date",
      description: "Date when test was taken"
    },
    notes: {
      type: "string",
      description: "Additional notes about the assessment"
    },
    certificate_url: {
      type: "string",
      description: "URL to certificate if earned"
    }
  },
  required: ["website_id", "website_name"]
};

export default AssessmentResultSchema;
