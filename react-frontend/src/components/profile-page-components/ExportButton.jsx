import { useState } from "react";

const ExportButton = () => {
  const [open, setOpen] = useState(false);

  const downloadFile = async (type) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/app/export?type=${type}`,
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
      a.download = type === "excel" ? "expenses.xlsx" : "expenses.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      setOpen(false);
    } catch (error) {
      console.error("Export expenses error:", error);
      alert("Failed to export expenses.");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-6 py-2 rounded-lg bg-blue-500 text-white shadow"
      >
        Export ▼
      </button>

      {open && (
        <div className="absolute mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
          <button
            onClick={() => downloadFile("csv")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Download CSV
          </button>

          <button
            onClick={() => downloadFile("excel")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Download Excel
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;