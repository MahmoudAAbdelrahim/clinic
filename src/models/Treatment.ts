import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const TreatmentSchema =
  new Schema(
    {
      patientId: {
        type:
          mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },

      doctorId: {
        type:
          mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },

      appointmentId: {
        type:
          mongoose.Types.ObjectId,
        ref: "Appointment",
      },

      diagnosis: {
        type: String,
        required: true,
      },

      treatment: {
        type: String,
        required: true,
      },

      instructions: {
        type: String,
      },

      notes: {
        type: String,
      },

      nextVisit: {
        type: Date,
      },

      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default
models.Treatment ||
model(
  "Treatment",
  TreatmentSchema
);