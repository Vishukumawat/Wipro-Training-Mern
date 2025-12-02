const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
  chest: { type: Number, default: null },
  waist: { type: Number, default: null },
  hip: { type: Number, default: null },
  shoulder: { type: Number, default: null },
  armLength: { type: Number, default: null },
  legLength: { type: Number, default: null }
});

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    notes: { type: String, default: "" },

    measurements: {
      type: measurementSchema,
      default: () => ({
        chest: null,
        waist: null,
        hip: null,
        shoulder: null,
        armLength: null,
        legLength: null
      })
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
