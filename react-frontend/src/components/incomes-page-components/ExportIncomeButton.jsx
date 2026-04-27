import { useState } from "react";

const ExportIncomeButton = () => {
  const [open, setOpen] = useState(false);

  const downloadFile = async (type) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/app/incomes/exportIncomes?type=${type}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = type === "excel" ? "incomes.xlsx" : "incomes.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      setOpen(false);
    } catch (error) {
      console.error("Export incomes error:", error);
      alert("Failed to export incomes.");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-purple-500 text-white rounded-lg"
      >
        Export ▼
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
          <button
            onClick={() => downloadFile("csv")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            CSV
          </button>

          <button
            onClick={() => downloadFile("excel")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportIncomeButton;