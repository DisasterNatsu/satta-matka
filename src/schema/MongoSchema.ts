import mongoose, { Schema, Document } from "mongoose";

// Define the user schema
const userSchema = new Schema({
  email: String,
  password: String,
});

// Define admin schema

const admin = new Schema({
  email: String,
  password: String,
});

// Define interface for MatkaData document
interface TipsData extends Document {
  date: string;
  tips: { index: number; tip: string }[];
  // Add createdAt field
}

const tips: Schema<TipsData> = new Schema({
  date: String,
  tips: [
    {
      index: { type: Number, required: true },
      tip: { type: String, required: true },
    },
  ],
});

// Define interface for MatkaData document
interface IMatkaData extends Document {
  date: string;
  data: { index: number; gameResultPatti: number; gameNumber: number }[];
  createdAt: Date; // Add createdAt field
}

// Define the matkaData schema
const mumbaiMatkaSchema: Schema<IMatkaData> = new Schema({
  date: { type: String, required: true },
  data: [
    {
      index: { type: Number, required: true },
      gameResultPatti: { type: Number, required: true },
      gameNumber: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Add createdAt field with default value
});

// Export MatkaData model
export const MatkaData = mongoose.model<IMatkaData>(
  "MatkaData",
  mumbaiMatkaSchema
);

// Export User model
export const User = mongoose.model("User", userSchema);

// Export User model
export const Admin = mongoose.model("Admin", admin);

// Export Tips model
export const Tips = mongoose.model("Tips", tips);
