"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const COLOR_HEX = {
  White: "#ffffff",
  Grey: "#808080",
  Anthracite: "#293133",
  Black: "#000000",
  Mocca: "#837060",
  Natural: "#E1C699",
  "Natural Black": "#1D1D1B",
  Chocolate: "#7B3F00",
};

export default function ProductPage() {
  const { id } = useParams();
  const { products, router, addToCart, user } = useAppContext();

  const [productData, setProductData] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (products && products.length) {
      const product = products.find((p) => p._id === id);
      setProductData(product || null);
      setSelectedVariantIndex(0);
      setSelectedColorIndex(0);
      setQuantity(1);
      const firstColorImage = product?.variants?.[0]?.colors?.[0]?.image;
      setMainImage(firstColorImage || product?.image?.[0] || "");
    }
  }, [id, products]);

  if (!productData) return <Loading />;

  const variants = productData.variants || [];
  const currentVariant = variants[selectedVariantIndex] || null;
  const currentColors = currentVariant?.colors || [];
  const currentColor = currentColors[selectedColorIndex] || null;

  const displayPrice =
    currentColor?.price ?? productData.offerPrice ?? productData.price ?? 0;

  const discountPercent =
    productData.price &&
    productData.offerPrice &&
    productData.price > productData.offerPrice
      ? Math.round(
          ((productData.price - productData.offerPrice) / productData.price) * 100
        )
      : 0;

  const imageList = productData.image || [];

  const selectVariant = (index) => {
    setSelectedVariantIndex(index);
    setSelectedColorIndex(0);
    setQuantity(1);
    const defaultColorImage = variants[index]?.colors?.[0]?.image;
    setMainImage(defaultColorImage || productData.image?.[0] || "");
  };

  const selectColor = (index) => {
    setSelectedColorIndex(index);
    setQuantity(1);
    const colorImage = currentColors[index]?.image;
    if (colorImage) {
      setMainImage(colorImage);
    } else {
      setMainImage(productData.image?.[0] || "");
    }
  };

  const decrementQty = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const incrementQty = () => {
    setQuantity((q) => q + 1);
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-2 pt-14 space-y-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: Main Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg bg-gray-50">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={productData.name}
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-200 text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnails below */}
            <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-hide">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`border rounded-lg overflow-hidden flex-shrink-0 cursor-pointer ${
                    mainImage === img ? "border-orange-500" : "border-transparent"
                  }`}
                  type="button"
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold">{productData.name}</h1>
            <p className="text-lg text-gray-500 mb-4">
              Color: {currentColor?.name ?? "N/A"}
            </p>

            {/* Variant selector */}
            <div className="flex space-x-4 mb-6">
              {variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => selectVariant(idx)}
                  className={`py-2 px-4 border rounded-md font-semibold ${
                    selectedVariantIndex === idx
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  type="button"
                >
                  {variant.name}
                </button>
              ))}
            </div>

            {/* Color selector */}
            <div className="flex space-x-4 mb-6 items-center">
              <span className="font-semibold mr-4">Color:</span>
              {currentColors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => selectColor(idx)}
                  title={color.name}
                  className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center cursor-pointer ${
                    selectedColorIndex === idx ? "ring-2 ring-blue-600" : ""
                  }`}
                  style={{ backgroundColor: COLOR_HEX[color.name] || "#ccc" }}
                  type="button"
                >
                  <div className="w-6 h-6 rounded-full" />
                </button>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="font-semibold">Quantity:</span>
              <button
                onClick={decrementQty}
                className="w-8 h-8 rounded border border-gray-400 text-2xl flex items-center justify-center select-none"
                type="button"
              >
                −
              </button>
              <span className="text-xl">{quantity}</span>
              <button
                onClick={incrementQty}
                className="w-8 h-8 rounded border border-gray-400 text-2xl flex items-center justify-center select-none"
                type="button"
              >
                +
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-semibold">${displayPrice.toFixed(2)}</span>
              {discountPercent > 0 && (
                <>
                  <span className="text-gray-500 line-through text-lg">
                    ${productData.price.toFixed(2)}
                  </span>
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Price info */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <div className="text-xs text-gray-600 mb-1">Per sq.ft</div>
                <div className="font-semibold text-lg">
                  ${productData.perSqFtPrice?.toFixed(2) ?? "N/A"}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded shadow text-center">
                <div className="text-xs text-gray-600 mb-1">Per panel</div>
                <div className="font-semibold text-lg">
                  {productData.perPanelSqFt?.toFixed(3) ?? "N/A"} sq.ft
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(productData._id, quantity)}
              className="w-full py-3.5 bg-black text-white rounded hover:bg-gray-900 transition"
            >
              <span className="inline-flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.97-1.58L23 6H6"></path>
                </svg>
                <span>Add to Cart</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
