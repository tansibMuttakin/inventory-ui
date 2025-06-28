import React, { useState } from "react";
import { api } from "../../api";

const ProductEntry = () => {
  const [form, setForm] = useState({
    name: "",
    purchase_price: "",
    sell_price: "",
    opening_stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", form);
      alert("Product added successfully!");
      setForm({
        name: "",
        purchase_price: "",
        sell_price: "",
        opening_stock: "",
      });
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Error adding product.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Purchase Price (TK)
          </label>
          <input
            type="number"
            name="purchase_price"
            value={form.purchase_price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sell Price (TK)
          </label>
          <input
            type="number"
            name="sell_price"
            value={form.sell_price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Opening Stock (Units)
          </label>
          <input
            type="number"
            name="opening_stock"
            value={form.opening_stock}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductEntry;
