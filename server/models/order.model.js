const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      resource: { type: Object, required: true },
    },
  ],
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
