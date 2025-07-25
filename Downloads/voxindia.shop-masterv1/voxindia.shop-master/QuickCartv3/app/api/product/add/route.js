import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) return NextResponse.json({ success: false, message: "Not authorized" });

    const isSeller = await authSeller(userId);
    if (!isSeller) return NextResponse.json({ success: false, message: "Not authorized" });

    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");
    const perSqFtPrice = formData.get("perSqFtPrice");
    const perPanelSqFt = formData.get("perPanelSqFt");

    const variantsRaw = formData.get("variants");
    let variants = [];
    if (variantsRaw) variants = JSON.parse(variantsRaw);

    // Upload main images (multiple files under 'images')
    const mainImageFiles = formData.getAll("images");
    const mainImageUrls = [];
    for (const file of mainImageFiles) {
      if (!file) continue;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
      mainImageUrls.push(uploadResult.secure_url);
    }

    // Upload variant color images
    // Each color image file name is in form variant{vIndex}-color{cIndex}
    for (let vIndex = 0; vIndex < variants.length; vIndex++) {
      for (let cIndex = 0; cIndex < variants[vIndex].colors.length; cIndex++) {
        const fieldName = `variant${vIndex}-color${cIndex}`;
        const file = formData.get(fieldName);
        if (file) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            stream.end(buffer);
          });
          variants[vIndex].colors[cIndex].image = uploadResult.secure_url;
          variants[vIndex].colors[cIndex].price = Number(variants[vIndex].colors[cIndex].price);
        }
      }
    }

    // Save product to DB
    await connectDB();
    const newProduct = await Product.create({
      userId,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      perSqFtPrice: Number(perSqFtPrice),
      perPanelSqFt: Number(perPanelSqFt),
      image: mainImageUrls,
      variants,
      date: Date.now(),
    });

    return NextResponse.json({ success: true, message: "Product added successfully", newProduct });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || "Failed to add product" });
  }
}
