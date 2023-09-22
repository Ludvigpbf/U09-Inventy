import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface IItem extends Document {
  itemSKU: string;
  itemTitle: string;
  itemDescription?: string;
  itemImage?: Types.ObjectId;
  itemCategory?: (Types.ObjectId | null)[];
  itemSupplier?: Types.ObjectId | null;
  itemQuantity: number;
  itemUnit: string;
  itemPrice: number;
  ownedBy: Types.ObjectId;
}

const ItemSchema = new Schema<IItem>({
  itemSKU: { type: String, unique: true },
  itemTitle: { type: String, required: true, unique: true },
  itemDescription: { type: String },
  itemImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    default: "65041c500dbdfa80c85e3a66",
  },
  itemCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  ],
  itemSupplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    default: null,
  },
  itemQuantity: { type: Number, required: true },
  itemUnit: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ItemModel: Model<IItem> = mongoose.model<IItem>("Item", ItemSchema);

export default ItemModel;
