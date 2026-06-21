import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      default: null,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },
    photo: {
  type: String,
  default: "",
},
specialization: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);