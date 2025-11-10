// CareerDocument entity definition
export const CareerDocumentSchema = {
  name: "CareerDocument",
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "Document title"
    },
    document_type: {
      type: "string",
      enum: [
        "resume",
        "cover_letter",
        "portfolio",
        "certificate",
        "reference",
        "other"
      ],
      description: "Type of document"
    },
    file_url: {
      type: "string",
      description: "URL to the uploaded file"
    },
    version: {
      type: "string",
      description: "Version number or name"
    },
    description: {
      type: "string",
      description: "Document description"
    },
    tags: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Tags for organization"
    },
    last_updated: {
      type: "string",
      format: "date",
      description: "Last update date"
    },
    is_current: {
      type: "boolean",
      default: false,
      description: "Is this the current/active version"
    }
  },
  required: ["title", "document_type"]
};

export default CareerDocumentSchema;
