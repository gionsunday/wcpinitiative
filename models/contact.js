const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ContactSchema = new mongoose.Schema(
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
    subject: {
        type: String,
        trim: true,
        required: [true, "please provide an email"],
      },
      message: {
        type: String,
        trim: true,
        required: [true, "please provide an email"],
      },
  },
  { timestamps: true }
);

// AppointmentSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model("Contact", ContactSchema);
