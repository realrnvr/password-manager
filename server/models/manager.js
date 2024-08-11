import mongoose from "mongoose";

const managerSchema = new mongoose.Schema(
  {
    site: {
      type: String,
      required: [true, "pls provide a Site"],
    },
    username: {
      type: String,
      required: [true, "pls provide a username"],
      maxLength: 100,
    },
    password: {
      type: String,
      required: [true, "pls provide a password"],
      minLength: 6,
    },
    note: {
      type: String,
      maxLength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "pls provide a User"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Manager", managerSchema);
