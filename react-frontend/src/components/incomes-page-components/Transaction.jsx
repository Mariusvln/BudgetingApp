import { useState } from "react";
import IncomeEditForm from "./IncomeEditForm";

const Transaction = ({
  id,
  description,
  category,
  amount,
  date,
  onTransactionAdded,
  categories = [],
}) => {
  const [showEdit, setShowEdit] = useState(false);

  const show = () => {
    setShowEdit(!showEdit);
  };

  const categoryName =
    categories.find((cat) => Number(cat.id) === Number(category))?.name ||
    `Category #${category}`;

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
        +${Number(amount)?.toFixed(2)}
      </td>
      <td>
        <button
          className="bg-green-500 text-white font-bold px-2 py-1 rounded-lg hover:bg-green-600"
          onClick={show}
        >
          Edit
        </button>
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