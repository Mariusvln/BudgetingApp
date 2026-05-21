import { Fragment, useState } from "react";
import ExpenseEditForm from "./ExpenseEditForm";
import { useAuth } from "../../contexts/AuthContext";
import { useAppAlert } from "../../contexts/useAppAlert";
import { formatCurrency } from "../../utils/currency";

const ExpenseTransaction = ({
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
    setShowEdit((prev) => !prev);
  };

  const categoryName =
    categories.find((cat) => Number(cat.id) === Number(category))?.name ||
    `Category #${category}`;

  const handleDelete = async () => {
    const confirmed = await appAlert.confirm("Delete this expense?", {
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
        `http://localhost:8080/api/app/expenses/?expenseId=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to delete expense");
      }

      onTransactionAdded?.();
      await appAlert.alert("Expense deleted successfully!", { type: "success" });
    } catch (error) {
      console.error("Error deleting expense:", error);
      await appAlert.alert("Could not delete expense.", { type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Fragment>
      <tr className="hover:bg-base-200/45">
        <td className="font-mono text-xs text-base-content/45">#{id}</td>
        <td className="text-sm text-base-content/60">{date}</td>
        <td className="text-sm font-medium text-base-content">
          {description || "No description"}
        </td>
        <td>
          <span className="badge border-primary/15 bg-primary/10 text-xs text-primary">
            {categoryName}
          </span>
        </td>
        <td className="text-right font-medium text-error">
          -{formatCurrency(amount, user?.currency)}
        </td>
        <td>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-lg bg-primary px-2 py-1 font-bold text-primary-content hover:bg-primary/90"
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
      </tr>

      {showEdit && (
        <ExpenseEditForm
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
    </Fragment>
  );
};

export default ExpenseTransaction;
