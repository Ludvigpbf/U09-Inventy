import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  path: { type: String, required: true },
});

export const ReceiptModel = mongoose.model("Receipt", ReceiptSchema);
