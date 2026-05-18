import { useState } from "react";
import IncomeEditForm from "./IncomeEditForm";
import { useAuth } from "../../contexts/AuthContext";
import { useAppAlert } from "../../contexts/useAppAlert";
import { formatCurrency } from "../../utils/currency";

const Transaction = ({
  id,
  description,
  category,
  amount,
  date,
  onTransactionAdded,
  categories = [],
}) => {
  const { user } = useAuth();
  const appAlert = useAppAlert();
  const [showEdit, setShowEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const show = () => {
    setShowEdit(!showEdit);
  };

  const categoryName =
    categories.find((cat) => Number(cat.id) === Number(category))?.name ||
    `Category #${category}`;

  const handleDelete = async () => {
    const confirmed = await appAlert.confirm("Delete this income?", {
      confirmText: "Delete",
      description: "This action cannot be undone.",
      type: "error",
    });

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/app/incomes/?incomeId=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete income");
      }

      onTransactionAdded?.();
      await appAlert.alert("Income deleted successfully!", { type: "success" });
    } catch (error) {
      console.error("Error deleting income:", error);
      await appAlert.alert("Could not delete income.", { type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr className="hover">
      <td className="text-xs font-mono text-gray-400">#{id}</td>
      <td className="text-sm text-gray-500">{date}</td>
      <td className="text-sm font-medium text-gray-700">{description}</td>
      <td>
        <span className="badge badge-soft badge-primary text-xs">
          {categoryName}
        </span>
      </td>
      <td className="text-right font-medium text-green-600">
        +{formatCurrency(amount, user?.currency)}
      </td>
      <td>
        <div className="flex justify-end gap-2">
          <button
            className="bg-primary text-primary-content font-bold px-2 py-1 rounded-lg hover:bg-primary/90"
            onClick={show}
          >
            Edit
          </button>
          <button
            type="button"
            className="rounded-lg bg-error px-2 py-1 font-bold text-error-content hover:bg-error/90 disabled:opacity-60"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </td>
      <td>
        {showEdit && (
          <IncomeEditForm
            id={id}
            description={description}
            category={category}
            amount={amount}
            date={date}
            show={show}
            onTransactionAdded={onTransactionAdded}
            categories={categories}
          />
        )}
      </td>
    </tr>
  );
};

export default Transaction;
