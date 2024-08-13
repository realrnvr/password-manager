import mongoose from "mongoose";
import crypto from "crypto";

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

managerSchema.pre("save", function () {
  const key = Buffer.from(process.env.ENCRYPTION_KEY, "base64");
  const algorithm = "aes-256-cbc";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(this.password, "utf-8", "hex");
  encrypted += cipher.final("hex");

  this.password = iv.toString("hex") + ":" + encrypted;
});

managerSchema.methods.decryptPassword = function (encryptedPassword) {
  const key = Buffer.from(process.env.ENCRYPTION_KEY, "base64");
  const algorithm = "aes-256-cbc";
  const textParts = encryptedPassword.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

export default mongoose.model("Manager", managerSchema);
