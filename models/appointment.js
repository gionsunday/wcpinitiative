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
      maxlength: [20, "name must not be greater than 20 characters"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "please provide an email"],
      maxlength: [50, "name must not be greater than 20 characters"],
    },
  },
  { timestamps: true }
);

// AppointmentSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model("Appointment", AppointmentSchema);
