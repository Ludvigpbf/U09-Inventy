import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface ISupplier extends Document {
  supplierName: string;
  ownedBy: Types.ObjectId;
}
const SupplierSchema = new Schema<ISupplier>({
  supplierName: { type: String, required: true, unique: true },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const SupplierModel: Model<ISupplier> = mongoose.model<ISupplier>(
  "Supplier",
  SupplierSchema
);

export default SupplierModel;
