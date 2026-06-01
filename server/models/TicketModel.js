import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    message: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "support", "admin"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const attachmentSchema =
new mongoose.Schema({

  fileName: String,

  fileUrl: String,

  fileType: String,

  fileSize: Number,

  uploadedAt: {
    type: Date,
    default: Date.now,
  },

});
const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    subject: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      enum: [
        "Technical Support",
        "Sales",
        "Billing",
        "General",
      ],
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Open",
        "In Progress",
        "Resolved",
        "Closed",
      ],
      default: "Open",
    },

    message: {
      type: String,
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  attachments: [attachmentSchema],
    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Ticket",
  ticketSchema
);