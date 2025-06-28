import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

const SaleEntry = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_id: "",
    quantity: 1,
    discount: 0,
    vat: 0,
    paid_amount: 0,
  });

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
        if (res.data.length > 0) {
          setForm((prev) => ({
            ...prev,
            product_id: res.data[0].id,
          }));
          setPrice(res.data[0].sell_price);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const selected = products.find((p) => p.id === parseInt(productId));
    setForm({ ...form, product_id: productId });
    if (selected) setPrice(selected.sell_price);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const qty = parseFloat(form.quantity || 0);
    const discount = parseFloat(form.discount || 0);
    const vat = parseFloat(form.vat || 0);
    const subtotal = qty * price;
    const afterDiscount = subtotal - discount;
    return afterDiscount + (afterDiscount * vat) / 100;
  };

  const total = calculateTotal();
  const due = total - parseFloat(form.paid_amount || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sales", {
        ...form,
        total,
        due,
      });
      alert("Sale recorded!");
      setForm({
        product_id: products[0]?.id || "",
        quantity: 1,
        discount: 0,
        vat: 0,
        paid_amount: 0,
      });
      navigate("/sales");
    } catch (error) {
      console.error("Error submitting sale", error);
      alert("Sale failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        New Sale Entry
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product
          </label>
          <select
            name="product_id"
            value={form.product_id}
            onChange={handleProductChange}
            className="w-full mt-1 px-3 py-2 border rounded"
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (TK {product.sell_price})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Discount (TK)
            </label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              VAT (%)
            </label>
            <input
              type="number"
              name="vat"
              value={form.vat}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Paid (TK)
          </label>
          <input
            type="number"
            name="paid_amount"
            value={form.paid_amount}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded"
          />
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <p>
            Total Amount:{" "}
            <span className="font-semibold">TK {total.toFixed(2)}</span>
          </p>
          <p>
            Due Amount:{" "}
            <span className="font-semibold text-red-500">
              TK {due.toFixed(2)}
            </span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit Sale
        </button>
      </form>
    </div>
  );
};

export default SaleEntry;
