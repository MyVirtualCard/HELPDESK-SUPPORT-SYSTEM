import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    role: {
      type: String,
      enum: ["admin", "support", "sales", "customer"],
      default: "customer",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);