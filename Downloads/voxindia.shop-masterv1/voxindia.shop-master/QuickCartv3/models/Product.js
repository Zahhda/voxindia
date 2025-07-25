import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number },
  perSqFtPrice: { type: Number },
  perPanelSqFt: { type: Number },
  image: [{ type: String, required: true }], // array of image URLs
  category: { type: String, required: true },
  date: { type: Number, default: Date.now },
  variants: [
    {
      name: { type: String },
      colors: [
        {
          name: { type: String },
          price: { type: Number },
          image: { type: String }, // URL string
        },
      ],
    },
  ],
});

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
