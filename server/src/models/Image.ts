import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface IImage extends Document {
  imageTitle?: string;
  imageDescription?: string;
  imagePath: string;
  ownedBy: Types.ObjectId;
}

const ImageSchema = new Schema<IImage>({
  imageTitle: { type: String },
  imageDescription: { type: String },
  imagePath: { type: String },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ImageModel: Model<IImage> = mongoose.model("Image", ImageSchema);

export default ImageModel;
