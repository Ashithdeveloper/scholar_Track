import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  caste: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  lasteducation: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
