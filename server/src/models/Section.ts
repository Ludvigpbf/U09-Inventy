import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface ISection extends Document {
  sectionTitle: string;
  sectionDescription: string;
  sectionImage: Types.ObjectId;
  sectionItems: {
    sectionItem: Types.ObjectId;
  }[];
  ownedBy: Types.ObjectId;
}
const SectionSchema = new Schema<ISection>({
  sectionTitle: { type: String, required: true, unique: true },
  sectionDescription: { type: String },
  sectionImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    default:
      "https://media.istockphoto.com/id/1399859917/sv/vektor/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=170667a&w=0&k=20&c=rxXk8ukIZzceaHA5ohwXPvFOEy-ncyNY8fipuX10ZmU=",
  },
  sectionItems: [
    {
      sectionItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      _id: false,
    },
  ],
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const SectionModel: Model<ISection> = mongoose.model<ISection>(
  "Section",
  SectionSchema
);

export default SectionModel;
