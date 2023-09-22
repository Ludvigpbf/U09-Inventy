import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface ICategory extends Document {
  categoryTitle?: string;
  ownedBy: Types.ObjectId;
}

const CategorySchema = new Schema<ICategory>({
  categoryTitle: { type: String, unique: true },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CategoryModel: Model<ICategory> = mongoose.model(
  "Category",
  CategorySchema
);

export default CategoryModel;
