import React, { useState } from "react";
import { api } from "../../api";

const FinancialReport = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await api.get("/financial-report", {
        params: { from, to },
      });
      setReport(res.data);
    } catch (err) {
      console.error("Failed to fetch report:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Financial Report
      </h2>

      <div className="bg-white p-6 rounded shadow mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
        <button
          onClick={fetchReport}
          disabled={!from || !to || loading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Generate Report"}
        </button>
      </div>

      {report && (
        <div className="bg-white p-6 rounded shadow space-y-4 text-center">
          <div className="text-lg font-medium text-gray-700">
            From <strong>{from}</strong> to <strong>{to}</strong>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-lg">
            <div className="bg-green-100 text-green-800 p-4 rounded shadow">
              <div className="font-bold">Total Sales</div>
              <div>{report.total_sales} TK</div>
            </div>
            <div className="bg-red-100 text-red-800 p-4 rounded shadow">
              <div className="font-bold">Total Expenses</div>
              <div>{report.total_expenses} TK</div>
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
              <div className="font-bold">Profit</div>
              <div>{report.profit} TK</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialReport;
