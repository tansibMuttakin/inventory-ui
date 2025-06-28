import React, { useState, useEffect } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="mb-4 flex justify-end">
        <Link
          to="/products/add"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-dark border border-gray-200 rounded shadow">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Purchase Price</th>
              <th className="px-6 py-3 border-b">Sell Price</th>
              <th className="px-6 py-3 border-b">Stock</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 border-b">{product.name}</td>
                <td className="px-6 py-4 border-b">{product.purchase_price}</td>
                <td className="px-6 py-4 border-b">{product.sell_price}</td>
                <td className="px-6 py-4 border-b">{product.opening_stock}</td>
                <td className="px-6 py-4 border-b flex">
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="btn-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
