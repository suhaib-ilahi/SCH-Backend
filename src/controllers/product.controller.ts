import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHanler.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrorHandler.js";
import {
  uploadToImageKit,
  deleteFromImageKit,
} from "../middlewares/imagekit.middleware.js";

const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});
  console.log("In the product getall handler", products);

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully!"));
});

const getSingleProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID is required");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully!"));
});

const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    image,
    sizes,
    category,
    imageBase64,
    imageName,
  } = req.body;

  if (!name || !price || !description) {
    throw new ApiError(400, "Name, price, and description are required");
  }

  let imageUrl = image;
  let imageFileId = null;

  // Handle ImageKit upload if imageBase64 is provided
  if (imageBase64) {
    try {
      const uploadResult = await uploadToImageKit(
        imageBase64,
        imageName || `${name.replace(/\s+/g, "-")}-${Date.now()}.jpg`
      );
      imageUrl = uploadResult.url;
      imageFileId = uploadResult.fileId;
    } catch (error) {
      console.error("ImageKit upload error:", error);
      throw new ApiError(500, "Failed to upload image");
    }
  } else if (!image) {
    throw new ApiError(400, "Image URL or image file is required");
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    sizes: sizes || [],
    category: category || "Formal",
    image: imageUrl,
    imageUrl,
    imageFileId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newProduct, "Product created successfully!"));
});

const editProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Product ID is required");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const {
    name,
    description,
    price,
    sizes,
    category,
    image,
    imageBase64,
    imageName,
  } = req.body;

  let imageUrl = image || product.image;
  let imageFileId = product.imageFileId;

  // Handle ImageKit upload if new image is provided
  if (imageBase64) {
    try {
      // Delete old image from ImageKit if it exists
      if (product.imageFileId) {
        try {
          await deleteFromImageKit(product.imageFileId);
        } catch (error) {
          console.error("Error deleting old image:", error);
          // Continue even if deletion fails
        }
      }

      // Upload new image
      const uploadResult = await uploadToImageKit(
        imageBase64,
        imageName ||
          `${name?.replace(/\s+/g, "-") || "product"}-${Date.now()}.jpg`
      );
      imageUrl = uploadResult.url;
      imageFileId = uploadResult.fileId;
    } catch (error) {
      console.error("ImageKit upload error:", error);
      throw new ApiError(500, "Failed to upload image");
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      description,
      price,
      sizes: sizes || product.sizes,
      category: category || product.category,
      image: imageUrl,
      imageUrl,
      imageFileId,
    },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProduct.toObject(),
        "Product updated successfully!"
      )
    );
});

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID is required");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Delete image from ImageKit if it exists
  if (product.imageFileId) {
    try {
      await deleteFromImageKit(product.imageFileId);
    } catch (error) {
      console.error("Error deleting image from ImageKit:", error);
      // Continue with product deletion even if image deletion fails
    }
  }

  const deletedProduct = await Product.findByIdAndDelete(id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedProduct, "Product deleted successfully!")
    );
});

export {
  getAllProducts,
  getSingleProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
