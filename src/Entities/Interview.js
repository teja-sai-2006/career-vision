// Interview entity definition
export const InterviewSchema = {
  name: "Interview",
  type: "object",
  properties: {
    job_application_id: {
      type: "string",
      description: "Related job application ID"
    },
    company: {
      type: "string",
      description: "Company name"
    },
    position: {
      type: "string",
      description: "Position interviewing for"
    },
    interview_date: {
      type: "string",
      format: "date-time",
      description: "Interview date and time"
    },
    interview_type: {
      type: "string",
      enum: [
        "phone_screen",
        "video_call",
        "in_person",
        "technical",
        "behavioral",
        "panel",
        "final"
      ],
      description: "Type of interview"
    },
    interviewer_name: {
      type: "string",
      description: "Name of interviewer(s)"
    },
    status: {
      type: "string",
      enum: [
        "scheduled",
        "completed",
        "cancelled",
        "rescheduled"
      ],
      default: "scheduled",
      description: "Interview status"
    },
    preparation_notes: {
      type: "string",
      description: "Notes for interview preparation"
    },
    interview_notes: {
      type: "string",
      description: "Notes from the interview"
    },
    questions_asked: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Questions asked during interview"
    },
    outcome: {
      type: "string",
      enum: [
        "pending",
        "passed",
        "rejected",
        "need_more_rounds"
      ],
      description: "Interview outcome"
    },
    location: {
      type: "string",
      description: "Interview location or video link"
    }
  },
  required: ["company", "position", "interview_date"]
};

export default InterviewSchema;
