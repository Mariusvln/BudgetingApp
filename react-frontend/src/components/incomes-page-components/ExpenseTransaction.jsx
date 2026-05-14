import { Fragment, useState } from "react";
import ExpenseEditForm from "./ExpenseEditForm";
import { useAuth } from "../../contexts/AuthContext";
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
  const [showEdit, setShowEdit] = useState(false);

  const show = () => {
    setShowEdit((prev) => !prev);
  };

  const categoryName =
    categories.find((cat) => Number(cat.id) === Number(category))?.name ||
    `Category #${category}`;

  return (
    <Fragment>
      <tr className="hover">
        <td className="text-xs font-mono text-gray-400">#{id}</td>
        <td className="text-sm text-gray-500">{date}</td>
        <td className="text-sm font-medium text-gray-700">{description}</td>
        <td>
          <span className="badge badge-soft badge-primary text-xs">
            {categoryName}
          </span>
        </td>
        <td className="text-right font-medium text-red-600">
          -{formatCurrency(amount, user?.currency)}
        </td>
        <td>
          <button
            type="button"
            className="bg-primary text-primary-content font-bold px-2 py-1 rounded-lg hover:bg-primary/90"
            onClick={show}
          >
            Edit
          </button>
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
