import ReactDom from "react-dom";
import { useState } from "react";

const ExpenseEditForm = ({ id, description, category, amount, date, show, onTransactionAdded }) => {
  const formId = id;
  const [formDate, setDate] = useState(date);
  const [formAmount, setAmount] = useState(amount);
  const [formDescription, setDescription] = useState(description);
  const [formCategory, setCategory] = useState(category);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // console.log("Used handle submit")
    if (!formAmount || !formDescription) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    const income = {
      description: formDescription,
      amount: parseFloat(formAmount),
      date: formDate,
      category: parseInt(formCategory),
      processType: "SINGLE",
      id: formId
    };

    try {
      const response = await fetch("http://localhost:8080/api/app/updateExpense", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(income),
    });

    if (response.ok) {
    if (onTransactionAdded) {
        onTransactionAdded();
    }
    alert("Income saved successfully!");
    } else {
        const errorData = await response.text();
        alert("Server error: " + errorData)

    }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    };
  }

  return ReactDom.createPortal(
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#000000b3] z-1000]">
      <form className="fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 bg-[white] z-1000 inset-y-2/4 flex flex-col justify-center gap-5 border border-black py-40 px-30"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <p>{formId}</p>
        <label>
          Date:
          <input
            type="date"
            value={formDate}
            onChange={(e) => setDate(e.target.value)}
            className="border border-black ml-2"
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={formDescription}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-black w-80 ml-2"
          />
        </label>
        <label>
          Category:
          <select className="border border-black ml-2" value={formCategory} onChange={(e) => setCategory(e.target.value)}>
            <option value="1">Food</option>
            <option value="2">Rent</option>
            <option value="3">Salary</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={formAmount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-black w-80 ml-2"
          />
        </label>
        <div className="flex gap-2 mt-2">
          <button className="bg-green-500 py-1 px-2 text-white rounded-lg font-bold hover:bg-green-600"
          type="submit"
          disabled={loading}
          >
            Submit
          </button>
          <button
            className="bg-red-500 py-1 px-2 text-white rounded-lg font-bold hover:bg-red-600"
            onClick={show}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>,
    document.getElementById("portal"),
  );
};

export default IncomeEditForm;