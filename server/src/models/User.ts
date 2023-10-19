import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  company: string;
  email: string;
  password: string;
  plan: string;
  billing: {
    company: string;
    orgNumber: string;
    adress: string;
    email: string;
    phone: number;
  };
  departments: {
    department: string;
    manager: string;
  }[];
}

const UserSchema = new Schema<IUser>({
  company: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!\s).{8,16}$/;
        return passwordRegex.test(value);
      },
      message:
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, no whitespace, and be between 8 and 16 characters long.",
    },
  },
  plan: { type: String, required: true },
  billing: {
    company: { type: String, required: true },
    orgNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          const orgNumberRegex = /^\d{10}$/;
          return orgNumberRegex.test(value);
        },
        message: "Organization number must be a 10-digit number.",
      },
    },
    address: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
        },
        message: "Invalid email address",
      },
    },
    phone: { type: Number, required: true },
  },
  departments: [
    {
      department: { type: String },
      manager: { type: String },
    },
  ],
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error as Error);
  }
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
