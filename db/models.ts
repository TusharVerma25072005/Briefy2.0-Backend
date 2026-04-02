import mongoose, { Schema, Document, model } from "mongoose";

export interface ISummary extends Document {
  id: string; // email ID
  summary_result: {
    session_id: string;
    email_id: string;
    user_id: string;
    type: string;
    category: "Work" | "Personal" | "Newsletter" | "Finance" | "HR" | "Other";
    subject: string;
    summary: string;
    action_items: { action: string; owner: string; deadline: string }[];
    open_questions: string[];
    priority: "Urgent" | "Important" | "Normal" | "Low";
  };
  updated_at: Date;
}

const SummarySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  summary_result: {
    session_id: { type: String },
    email_id: { type: String },
    user_id: { type: String },
    type: { type: String },
    category: { type: String, enum: ["Work", "Personal", "Newsletter", "Finance", "HR", "Other"] },
    subject: { type: String },
    summary: { type: String },
    action_items: [{ action: String, owner: String, deadline: String }],
    open_questions: [String],
    priority: { type: String, enum: ["Urgent", "Important", "Normal", "Low"] },
  },
  updated_at: { type: Date },
});

export const Summary = mongoose.models.Summary || model<ISummary>("Summary", SummarySchema);