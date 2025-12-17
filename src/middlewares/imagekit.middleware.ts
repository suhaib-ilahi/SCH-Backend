import { imagekit } from "../config/imagekit.js";

export const uploadToImageKit = async (
  base64File: string,
  fileName: string
): Promise<{ url: string; fileId: string }> => {
  try {
    const result = await imagekit.upload({
      file: base64File,
      fileName,
      folder: "/products",
    });
    return {
      url: result.url,
      fileId: result.fileId,
    };
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
};

export const deleteFromImageKit = async (fileId: string): Promise<void> => {
  try {
    await imagekit.deleteFile(fileId);
  } catch (error) {
    console.error("ImageKit delete error:", error);
    throw error;
  }
};
