// AssessmentDomain entity definition
export const AssessmentDomainSchema = {
  name: "AssessmentDomain",
  type: "object",
  properties: {
    name: {
      type: "string",
      description: "Domain name"
    },
    description: {
      type: "string",
      description: "Domain description"
    },
    icon: {
      type: "string",
      description: "Icon identifier for the domain"
    },
    color: {
      type: "string",
      description: "Color theme for the domain"
    },
    gradient: {
      type: "string",
      description: "Optional gradient utility classes for the domain card"
    },
    order: {
      type: "number",
      description: "Display order"
    }
  },
  required: ["name"]
};

export default AssessmentDomainSchema;
