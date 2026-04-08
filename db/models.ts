import mongoose, { Schema, model, Document } from "mongoose";

export interface ISummary extends Document {
  id: string;

  summary_result: {
    category: string | null;
    detailedSummary: string | null;
    email_id: string;
    priority: string | null;
    session_id: string;
    subject: string | null;
    summary: string | null;
  };

  vector_embedding: number[];

  updated_at: Date;
}

const SummarySchema = new Schema<ISummary>({
  id: {
    type: String,
    required: true,
  },

  summary_result: {
    category: {
      type: String,
      default: null,
    },

    detailedSummary: {
      type: String,
      default: null,
    },

    email_id: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      default: null,
    },

    session_id: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      default: null,
    },

    summary: {
      type: String,
      default: null,
    },
  },

  vector_embedding: {
    type: [Number],
    default: [],
  },

  updated_at: {
    type: Date,
    required: true,
  },
});

export const Summary =
  mongoose.models.Summary || model<ISummary>("Summary", SummarySchema);