import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const MedicalRecordSchema =
  new Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      age: {
        type: Number,
      },

      gender: {
        type: String,
        enum: [
          "male",
          "female",
        ],
      },

      weight: {
        type: Number,
      },

      height: {
        type: Number,
      },

      bloodType: {
        type: String,
      },

      chronicDiseases: [
        String,
      ],

      drugAllergies: [
        String,
      ],

      currentMedications: {
        type: String,
      },

      firstVisitReason: {
        type: String,
      },

      medicalDescription: {
        type: String,
      },

      previousOperations: {
        type: String,
      },

      familyDiseases: {
        type: String,
      },

      attachments: [
        String,
      ],
    },
    {
      timestamps: true,
    }
  );

export default
models.MedicalRecord ||
model(
  "MedicalRecord",
  MedicalRecordSchema
);