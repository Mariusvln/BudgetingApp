import { useState } from "react";

const ExportButton = () => {
  const [open, setOpen] = useState(false);

  const exportOptions = [
    {
      label: "Expenses CSV",
      fileName: "expenses.csv",
      url: "http://localhost:8080/api/app/expenses/export?type=csv",
    },
    {
      label: "Expenses Excel",
      fileName: "expenses.xlsx",
      url: "http://localhost:8080/api/app/expenses/export?type=excel",
    },
    {
      label: "Incomes CSV",
      fileName: "incomes.csv",
      url: "http://localhost:8080/api/app/incomes/exportIncomes?type=csv",
    },
    {
      label: "Incomes Excel",
      fileName: "incomes.xlsx",
      url: "http://localhost:8080/api/app/incomes/exportIncomes?type=excel",
    },
  ];

  const downloadFile = async (option) => {
    try {
      const response = await fetch(option.url, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = option.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      setOpen(false);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export file.");
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
        <div className="absolute z-10 mt-2 w-52 rounded-lg border bg-white shadow-lg">
          {exportOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => downloadFile(option)}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportButton;
