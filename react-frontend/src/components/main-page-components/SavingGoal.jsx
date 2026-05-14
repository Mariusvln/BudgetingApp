import { useAuth } from "../../contexts/AuthContext";
import { formatCurrency } from "../../utils/currency";

const SavingGoal = () => {
  const { user } = useAuth();

  return (
    <section className="flex w-[22.5rem] flex-col justify-center gap-4 self-center rounded-2xl border border-base-300 bg-base-100 p-4 shadow-[0_16px_36px_color-mix(in_oklch,var(--color-base-content)_7%,transparent)]">
      <div className="flex justify-between">
        <div>
          <div className="flex justify-between gap-22 text-base-content/55">
            <h4 className="text-lg font-bold text-base-content">Saving Goal</h4>
            <p className="font-bold">{formatCurrency(2300, user?.currency)}</p>
          </div>
          <h2 className="text-3xl font-bold text-base-content">
            {formatCurrency(1840, user?.currency)}
          </h2>
        </div>
        <div className="self-center">
          <button className="rounded-3xl bg-primary/15 px-4 pb-3 pt-1.5 text-xl font-bold text-primary transition hover:bg-primary/25">
            {">"}
          </button>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-base-300">
        <div className="h-full w-[80%] rounded-full bg-primary" />
      </div>
    </section>
  );
};

export default SavingGoal;
