const ExportButton = () => {
  const handleExport = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/app/export");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "expenses.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="px-6 py-2 rounded-lg bg-blue-500 text-white shadow"
    >
      Download Expenses
    </button>
  );
};

export default ExportButton;