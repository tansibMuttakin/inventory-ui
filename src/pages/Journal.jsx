import React, { useEffect, useState } from "react";
import { api } from "../../api";

const typeMap = {
  sales: { label: "Sales", side: "credit" },
  discount: { label: "Discount", side: "debit" },
  vat: { label: "VAT", side: "credit" },
  payment_cash: { label: "Payment (Cash)", side: "debit" },
  payment_due: { label: "Payment (Due)", side: "debit" },
};

const Journal = () => {
  const [grouped, setGrouped] = useState({});

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await api.get("/journals");
        const data = res.data;

        // Group by sale_id
        const groupedData = {};
        data.forEach((entry) => {
          const id = entry.sale_id;
          if (!groupedData[id]) groupedData[id] = [];
          groupedData[id].push(entry);
        });

        setGrouped(groupedData);
      } catch (error) {
        console.error("Error loading journals:", error);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Accounting Journals</h1>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-500">No journal entries found.</p>
      ) : (
        Object.entries(grouped).map(([saleId, entries]) => (
          <div
            key={saleId}
            className="mb-8 border border-gray-200 rounded shadow p-4"
          >
            <h2 className="text-lg font-semibold mb-2">
              Sale #{saleId} –{" "}
              {new Date(entries[0].created_at).toLocaleDateString()}
            </h2>

            <table className="min-w-full bg-dark border border-gray-200 rounded shadow">
              <thead className="bg-gray-100 text-left text-gray-700">
                <tr>
                  <th className="px-4 py-2 border-b">Account</th>
                  <th className="px-4 py-2 border-b">Type</th>
                  <th className="px-4 py-2 border-b">Amount (TK)</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const { label, side } = typeMap[entry.type] || {
                    label: entry.type,
                    side: "debit",
                  };
                  return (
                    <tr key={entry.id}>
                      <td className="px-4 py-2 border-b">{label}</td>
                      <td className="px-4 py-2 border-b capitalize">{side}</td>
                      <td className="px-4 py-2 border-b">
                        {parseFloat(entry.amount).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Journal;
