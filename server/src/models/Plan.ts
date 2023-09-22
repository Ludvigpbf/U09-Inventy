import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface IPlan extends Document {
  planTitle: string;
  planPrice: number;
  planNumber: number;
  ownedBy: Types.ObjectId;
}

const PlanSchema = new Schema<IPlan>({
  planTitle: { type: String, unique: true },
  planPrice: { typed: Number },
  planNumber: { type: Number },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const PlanModel: Model<IPlan> = mongoose.model("Plan", PlanSchema);

export default PlanModel;
