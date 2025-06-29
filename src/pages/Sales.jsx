import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await api.get("/sales");
        setSales(res.data);
      } catch (error) {
        console.error("Failed to fetch sales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading sales...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales List</h1>

      <div className="mb-4 flex justify-end">
        <Link
          to="/sales/add"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Sale
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-dark border border-gray-200 rounded shadow">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-6 py-3 border-b">Product</th>
              <th className="px-6 py-3 border-b">Quantity</th>
              <th className="px-6 py-3 border-b">Selling Price</th>
              <th className="px-6 py-3 border-b">Discount</th>
              <th className="px-6 py-3 border-b">VAT (%)</th>
              <th className="px-6 py-3 border-b">Total</th>
              <th className="px-6 py-3 border-b">Received</th>
              <th className="px-6 py-3 border-b">Due</th>
              <th className="px-6 py-3 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 border-b">
                  {sale?.product?.name || "N/A"}
                </td>
                <td className="px-6 py-4 border-b">{sale?.quantity}</td>
                <td className="px-6 py-4 border-b">
                  {sale?.product?.sell_price}
                </td>
                <td className="px-6 py-4 border-b">TK {sale?.discount}</td>
                <td className="px-6 py-4 border-b">{sale?.vat}%</td>
                <td className="px-6 py-4 border-b">TK {sale?.total}</td>
                <td className="px-6 py-4 border-b">TK {sale?.paid_amount}</td>
                <td className="px-6 py-4 border-b text-red-600">
                  TK {sale?.due_amount}
                </td>
                <td className="px-6 py-4 border-b">
                  {new Date(sale?.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td
                  className="px-6 py-4 border-b text-center text-gray-500"
                  colSpan="8"
                >
                  No sales recorded.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
