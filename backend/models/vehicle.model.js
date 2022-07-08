const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const vehicleSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    chasisNumber: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    plateNumber: {
      type: String,
      required: true,
      unique: true
    },
    modelname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
