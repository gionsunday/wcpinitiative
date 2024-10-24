const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AppointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      required: [true, "please provide an name"],
    },
    email: {
      type: String,

      trim: true,
      required: [true, "please provide an email"],
    },
    phone: {
      type: String,

      trim: true,
      required: [true, "please provide an email"],
    },
    theTime: {
      type: String,

      trim: true,
      required: [true, "please provide time"],
    },
    theDate: {
      type: String,

      trim: true,
      required: [true, "please provide date"],
    },
    topic: {
      type: String,
      trim: true,
      required: [true, "please provide service"],
    },
    message: {
      type: String,
      trim: true,
      required: [true, "please provide message"],
    },
  },
  { timestamps: true }
);

// AppointmentSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model("Appointment", AppointmentSchema);
