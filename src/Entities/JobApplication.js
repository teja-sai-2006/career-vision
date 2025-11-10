// JobApplication entity definition
export const JobApplicationSchema = {
  name: "JobApplication",
  type: "object",
  properties: {
    company: {
      type: "string",
      description: "Company name"
    },
    position: {
      type: "string",
      description: "Job position/title"
    },
    job_url: {
      type: "string",
      description: "Link to job posting"
    },
    status: {
      type: "string",
      enum: [
        "saved",
        "applied",
        "interviewing",
        "offer",
        "rejected",
        "accepted",
        "declined"
      ],
      default: "saved",
      description: "Application status"
    },
    application_date: {
      type: "string",
      format: "date",
      description: "Date applied"
    },
    salary_range: {
      type: "string",
      description: "Salary range offered"
    },
    location: {
      type: "string",
      description: "Job location"
    },
    job_type: {
      type: "string",
      enum: [
        "full_time",
        "part_time",
        "contract",
        "internship",
        "freelance"
      ],
      description: "Type of employment"
    },
    remote_type: {
      type: "string",
      enum: [
        "on_site",
        "remote",
        "hybrid"
      ],
      description: "Remote work arrangement"
    },
    notes: {
      type: "string",
      description: "Additional notes about the application"
    },
    contact_person: {
      type: "string",
      description: "Recruiter or contact name"
    },
    contact_email: {
      type: "string",
      description: "Contact email"
    },
    follow_up_date: {
      type: "string",
      format: "date",
      description: "Next follow-up date"
    }
  },
  required: ["company", "position"]
};

export default JobApplicationSchema;
