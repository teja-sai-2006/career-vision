// AssessmentSubdomain entity definition
export const AssessmentSubdomainSchema = {
  name: "AssessmentSubdomain",
  type: "object",
  properties: {
    domain_id: {
      type: "string",
      description: "Parent domain ID"
    },
    name: {
      type: "string",
      description: "Subdomain name"
    },
    description: {
      type: "string",
      description: "Subdomain description"
    },
    order: {
      type: "number",
      description: "Display order"
    }
  },
  required: ["domain_id", "name"]
};

export default AssessmentSubdomainSchema;
