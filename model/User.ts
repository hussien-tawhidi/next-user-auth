import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: [true, "Email is required"],
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    minLength: [4, "Full name must be at least 4 character"],
    maxLength: [30, "Full name must be maximum "],
  },
  password: {
    type: String,
    required: [true, "Email is required"],
    select: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
