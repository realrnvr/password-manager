import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a Username"],
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Pls provide a valid Email",
    ],
    // Not a validator
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a Password"],
    minLength: 6,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.methods.verifyPassword = async function (userPassword) {
  const isMatch = await bcryptjs.compare(userPassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { username: this.username, userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TIMESPAN,
    }
  );
};

export default mongoose.model("User", UserSchema);
