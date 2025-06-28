import React, { useState, useEffect } from "react";
import { api } from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    purchase_price: "",
    sell_price: "",
    opening_stock: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const data = res.data;
        setForm({
          name: data.name,
          purchase_price: data.purchase_price,
          sell_price: data.sell_price,
          opening_stock: data.opening_stock,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        alert("Could not load product data.");
        navigate("/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${id}`, form);
      alert("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Error updating product.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Edit Product
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
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
