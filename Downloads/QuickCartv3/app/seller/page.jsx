"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

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

export default function AddProduct() {
  const { getToken } = useAppContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [perSqFtPrice, setPerSqFtPrice] = useState("");
  const [perPanelSqFt, setPerPanelSqFt] = useState("");
  const [mainImages, setMainImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add new variant
  const handleAddVariant = () => {
    setVariants([...variants, { name: "", colors: [] }]);
  };

  // Add color to a variant
  const handleAddColor = (variantIndex) => {
    const updated = [...variants];
    updated[variantIndex].colors.push({ name: "", price: "", image: null });
    setVariants(updated);
  };

  // Change variant name
  const handleVariantChange = (index, value) => {
    const updated = [...variants];
    updated[index].name = value;
    setVariants(updated);
  };

  // Change color detail
  const handleColorChange = (vIndex, cIndex, key, value) => {
    const updated = [...variants];
    updated[vIndex].colors[cIndex][key] = value;
    setVariants(updated);
  };

  // Upload color image
  const handleFileChange = (vIndex, cIndex, file) => {
    const updated = [...variants];
    updated[vIndex].colors[cIndex].image = file;
    setVariants(updated);
  };

  // Upload main images handler
  const handleMainImagesChange = (e) => {
    setMainImages([...e.target.files]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice);
      formData.append("perSqFtPrice", perSqFtPrice);
      formData.append("perPanelSqFt", perPanelSqFt);

      mainImages.forEach((file) => {
        formData.append("images", file);
      });

      const structuredVariants = variants.map((v, vIndex) => ({
        name: v.name,
        colors: v.colors.map((c, cIndex) => ({
          name: c.name,
          price: c.price,
          imageFieldName: `variant${vIndex}-color${cIndex}`,
        })),
      }));

      formData.append("variants", JSON.stringify(structuredVariants));

      variants.forEach((v, vIndex) => {
        v.colors.forEach((c, cIndex) => {
          if (c.image) {
            formData.append(`variant${vIndex}-color${cIndex}`, c.image);
          }
        });
      });

      const token = await getToken();

      const res = await axios.post("/api/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setDescription("");
        setCategory("LINERIO");
        setPrice("");
        setOfferPrice("");
        setPerSqFtPrice("");
        setPerPanelSqFt("");
        setMainImages([]);
        setVariants([]);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Fields */}
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full p-3 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Original Price"
            className="p-3 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Sale Price"
            className="p-3 border rounded"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Extra pricing */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price Per sq.ft"
            className="p-3 border rounded"
            value={perSqFtPrice}
            onChange={(e) => setPerSqFtPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Sq.ft Per Panel"
            className="p-3 border rounded"
            value={perPanelSqFt}
            onChange={(e) => setPerPanelSqFt(e.target.value)}
            required
            min="0"
            step="0.001"
          />
        </div>

        {/* Main Images */}
        <div>
          <label className="block font-semibold mb-2">Main Images (multiple):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleMainImagesChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Variants */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Variants</h3>
          {variants.map((variant, vIndex) => (
            <div key={vIndex} className="border p-4 rounded mb-6 bg-gray-50">
              <input
                type="text"
                placeholder="Variant Name (e.g., S-Line)"
                className="w-full mb-4 p-3 border rounded"
                value={variant.name}
                onChange={(e) => handleVariantChange(vIndex, e.target.value)}
                required
              />

              {variant.colors.map((color, cIndex) => (
                <div
                  key={cIndex}
                  className="grid grid-cols-4 gap-4 items-center mb-4"
                >
                  <select
                    className="p-2 border rounded"
                    value={color.name}
                    onChange={(e) =>
                      handleColorChange(vIndex, cIndex, "name", e.target.value)
                    }
                    required
                  >
                    <option value="">Select Color</option>
                    {Object.keys(COLOR_HEX).map((colorName) => (
                      <option key={colorName} value={colorName}>
                        {colorName}
                      </option>
                    ))}
                  </select>

                  <div
                    className="w-10 h-10 rounded-full border"
                    style={{ backgroundColor: COLOR_HEX[color.name] || "#ccc" }}
                  ></div>

                  <input
                    type="number"
                    placeholder="Color Price"
                    className="p-2 border rounded"
                    value={color.price}
                    onChange={(e) =>
                      handleColorChange(vIndex, cIndex, "price", e.target.value)
                    }
                    required
                    min="0"
                    step="0.01"
                  />

                  <input
                    type="file"
                    accept="image/*"
                    className="p-2"
                    onChange={(e) =>
                      handleFileChange(vIndex, cIndex, e.target.files[0])
                    }
                    required
                  />
                </div>
              ))}

              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => handleAddColor(vIndex)}
              >
                + Add Color
              </button>
            </div>
          ))}

          <button
            type="button"
            className="text-green-600 hover:underline"
            onClick={handleAddVariant}
          >
            + Add Variant
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 mt-6 text-white rounded ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
}
