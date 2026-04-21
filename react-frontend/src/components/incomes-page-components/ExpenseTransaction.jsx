import { Fragment, useState } from "react";
import ExpenseEditForm from "./ExpenseEditForm";

const ExpenseTransaction = ({ id, description, category, amount, date, onTransactionAdded }) => {
  const [showEdit, setShowEdit] = useState(false);

  const show = () => {
    setShowEdit((prev) => !prev);
  };

  return (
    <Fragment>
      <tr className="hover">
        <td className="text-xs font-mono text-gray-400">#{id}</td>
        <td className="text-sm text-gray-500">{date}</td>
        <td className="text-sm font-medium text-gray-700">{description}</td>
        <td>
          <span className="badge badge-soft badge-primary text-xs">Cat: {category}</span>
        </td>
        <td className="text-right font-medium text-red-600">-${amount?.toFixed(2)}</td>
        <td>
          <button
            type="button"
            className="bg-green-500 text-white font-bold px-2 py-1 rounded-lg hover:bg-green-600"
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
        />
      )}
    </Fragment>
  );
};

export default ExpenseTransaction;