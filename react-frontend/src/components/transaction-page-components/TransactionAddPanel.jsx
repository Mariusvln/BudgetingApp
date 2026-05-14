import { useAuth } from "../../contexts/AuthContext";
import { getCurrencyPlaceholder } from "../../utils/currency";

function TransactionAddPanel() {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-sm">
      <div className="card bg-base-100 border border-base-200">
        <div className="card-body">
          <h2 className="font-semibold text-lg">Quick Add</h2>
          <p className="mb-4 text-sm text-base-content/60">
            Easily log a new transaction
          </p>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="input input-bordered"
            />

            <input
              type="text"
              placeholder={getCurrencyPlaceholder(user?.currency)}
              className="input input-bordered"
            />

            <input
              type="text"
              placeholder="Merchant"
              className="input input-bordered"
            />

            <select className="select select-bordered">
              <option>Select category</option>
              <option>Food</option>
              <option>Rent</option>
              <option>Salary</option>
            </select>

            <button className="btn btn-primary">
              Save Transaction
            </button>

            <button className="btn btn-neutral">Clear Fields</button>
          </div>

          
          <div className="mt-6 rounded-xl bg-primary p-4 text-primary-content">
            <p className="text-sm">
              You've spent 15% less on Food & Drink compared to last week.
            </p>

            <button className="btn btn-sm mt-3 border-primary-content/20 bg-base-100 text-base-content hover:bg-base-200">
              View Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionAddPanel;
