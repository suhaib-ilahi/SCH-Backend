import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    default: "Formal",
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  imageFileId: {
    type: String,
  },
});

export const Product = mongoose.model("Product", productSchema);
