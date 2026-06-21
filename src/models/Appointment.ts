import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

const AppointmentSchema =
  new Schema(
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },

      trackingNumber: {
        type: String,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      emergencyPhone: {
        type: String,
      },

      age: {
        type: Number,
        required: true,
      },

      gender: {
        type: String,
        enum: [
          "male",
          "female",
        ],
      },

      chronicDiseases: [
        String,
      ],

      visitReason: {
        type: String,
        required: true,
      },

      notes: {
        type: String,
      },

      appointmentDate: {
        type: Date,
        required: true,
      },

      queueNumber: {
        type: Number,
        required: true,
      },
      doctorId: {
  type: mongoose.Types.ObjectId,
  ref: "User",
  required: true,
},

doctorName: {
  type: String,
  required: true,
},

doctorSpecialization: {
  type: String,
  required: true,
},


      status: {
  type: String,
  enum: [
    "pending",
    "approved",
    "rejected",
    "completed"
  ],
  default: "pending"
}
    },
    {
      timestamps: true,
    }
  );

export default
models.Appointment ||
model(
  "Appointment",
  AppointmentSchema
);