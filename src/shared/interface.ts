export interface Settings {
  bannerTitle: string;
  bannerSubtitle: string;
  whatsappNumber: string;
}

export interface Product {
  _id?: string;
  name: string;
  sizes: string[];
  category: string;
  description: string;
  price: number;
  image: string;
  imageUrl?: string;
  imageFileId?: string;
}

export interface UserPayload {
  admin: boolean;
}
