import { useState } from "react";
import { useAppAlert } from "../../contexts/useAppAlert";

const ExportButton = ({ variant = "expenses" }) => {
  const appAlert = useAppAlert();
  const [open, setOpen] = useState(false);

  const exportOptions =
    variant === "incomes"
      ? [
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
        ]
      : [
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
      await appAlert.alert("Failed to export file.", { type: "error" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-content shadow transition hover:bg-primary/90"
      >
        Export v
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-52 overflow-hidden rounded-lg border border-base-300 bg-base-100 text-base-content shadow-lg">
          {exportOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => downloadFile(option)}
              className="block w-full px-4 py-2 text-left transition hover:bg-base-200"
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
