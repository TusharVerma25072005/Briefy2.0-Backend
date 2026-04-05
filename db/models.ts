import mongoose, { Schema, Document, model } from "mongoose";


export interface ISummary extends Document {
  id: string;

  summary_result: {
    action_items: {
      action: string | null;
      deadline: string | null;
      owner: string | null;
      source_quote: string;
    }[];

    category: string;
    confidence: number;

    email_id: string;

    eval: {
      passed: boolean;
      skipped: boolean;
    };

    flags: {
      attachments_unretrieved: any[];
      budget_exceeded: boolean;
      confidential: boolean;
      context_gap: boolean;
      context_gap_note: null;
      multilingual: null;
      multilingual_original_values: null;
    };

    key_details: {
      amounts: any[];
      attachments: any[];
      dates: string[];
      ids_and_references: string[];
    };

    key_entities: {
      dates: string[];
      email_addresses: any[];
      organizations: string[];
      people: string[];
    };

    open_questions: string[];

    pipeline: {
      eval_skipped: boolean;
      latency_ms: number;
      learned_rules: number;
    };

    priority: string;
    sentiment: string;
    session_id: string;
    subject: string;

    // ⚠️ string OR array
    summary: string | string[];

    type: string;

    type_enrichment: {
      amount: null;
      currency: null;
      due_date: null;
      invoice_or_reference_number: null;
      payment_method: null;
      status: null;
    };

    urgency: string;
    user_id: string | null;
  };

  vector_embedding: number[];

  updated_at: Date;
}
const SummarySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },

  summary_result: {
    action_items: [
      {
        action: { type: String, default: null },
        deadline: { type: String, default: null },
        owner: { type: String, default: null },
        source_quote: { type: String, required: true },
      },
    ],

    category: { type: String },
    confidence: { type: Number },

    email_id: { type: String, required: true },

    eval: {
      passed: { type: Boolean },
      skipped: { type: Boolean },
    },

    flags: {
      attachments_unretrieved: { type: [Schema.Types.Mixed], default: [] },
      budget_exceeded: { type: Boolean },
      confidential: { type: Boolean },
      context_gap: { type: Boolean },
      context_gap_note: { type: Schema.Types.Mixed, default: null },
      multilingual: { type: Schema.Types.Mixed, default: null },
      multilingual_original_values: { type: Schema.Types.Mixed, default: null },
    },

    key_details: {
      amounts: { type: [Schema.Types.Mixed], default: [] },
      attachments: { type: [Schema.Types.Mixed], default: [] },
      dates: { type: [String], default: [] },
      ids_and_references: { type: [String], default: [] },
    },

    key_entities: {
      dates: { type: [String], default: [] },
      email_addresses: { type: [Schema.Types.Mixed], default: [] },
      organizations: { type: [String], default: [] },
      people: { type: [String], default: [] },
    },

    open_questions: { type: [String], default: [] },

    pipeline: {
      eval_skipped: { type: Boolean },
      latency_ms: { type: Number },
      learned_rules: { type: Number },
    },

    priority: { type: String },
    sentiment: { type: String },
    session_id: { type: String },
    subject: { type: String },

    // ⚠️ IMPORTANT: string OR array
    summary: { type: Schema.Types.Mixed, required: true },

    type: { type: String },

    type_enrichment: {
      amount: { type: Schema.Types.Mixed, default: null },
      currency: { type: Schema.Types.Mixed, default: null },
      due_date: { type: Schema.Types.Mixed, default: null },
      invoice_or_reference_number: { type: Schema.Types.Mixed, default: null },
      payment_method: { type: Schema.Types.Mixed, default: null },
      status: { type: Schema.Types.Mixed, default: null },
    },

    urgency: { type: String },
    user_id: { type: String, default: null },
  },

  // ✅ CRITICAL FIELD (you missed earlier)
  vector_embedding: {
    type: [Number],
    required: true,
    default: [],
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});
export const Summary =
  mongoose.models.Summary || model<ISummary>("Summary", SummarySchema);