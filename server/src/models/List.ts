import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface IList extends Document {
  listTitle: string;
  listDescription?: string;
  listImage?: Types.ObjectId;
  listSections?: {
    listSection: Types.ObjectId;
  }[];
  listItems?: {
    listItem: Types.ObjectId;
  }[];
  ownedBy: Types.ObjectId;
}

const ListSchema = new Schema<IList>({
  listTitle: { type: String, required: true },
  listDescription: { type: String },
  listImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  listSections: [
    {
      listSection: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
    },
  ],
  listItems: [
    {
      listItem: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    },
  ],
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ListSchema.index({ ownedBy: 1, listTitle: 1 }, { unique: true });

const ListModel: Model<IList> = mongoose.model<IList>("List", ListSchema);

export default ListModel;
