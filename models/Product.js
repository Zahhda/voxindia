import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "user" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    date: { type: Number, required: true }
})
const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  variants: [
    {
      type: String,     // e.g., "Color"
      options: [String] // e.g., ["White", "Grey", "Black"]
    }
  ]
});
const Product = mongoose.models.product || mongoose.model('product',productSchema)

export default Product