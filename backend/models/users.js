
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      required: [true, "Please Enter Gender"]

    },
    contact: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
          type: String,
      },
      url: {
          type: String,
      }
  },
  role: {
      type: String,
      default: "user",
  },
    date: {
      type: Date,
      default: Date.now,
    },
  },
);
// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = User;





