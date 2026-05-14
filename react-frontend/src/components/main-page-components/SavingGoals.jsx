const SavingGoals = () => {
    return (
        <section className="flex flex-col justify-between gap-4 rounded-3xl border border-base-300 bg-base-100 p-4 shadow-[0_16px_36px_color-mix(in_oklch,var(--color-base-content)_7%,transparent)]">
          <div className="flex justify-between">
            <h4 className="text-lg font-bold text-base-content">Saving Goals</h4>
            <button className="rounded-full bg-base-200 px-2 pb-1 text-base-content transition hover:bg-base-300">+</button>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="text-base-content">New Car Fund</p>
              <p className="text-base-content/55">$12,000 / $25,000</p>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-base-300">
              <div className="h-full w-[30%] rounded-full bg-primary" />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="text-base-content">Emergency Fund</p>
              <p className="text-base-content/55">$8,500 / $10,000</p>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-base-300">
              <div className="h-full w-[80%] rounded-full bg-primary" />
            </div>
          </div>
          <button className="rounded-xl bg-primary px-3 py-3 font-bold text-primary-content transition hover:bg-primary/90">+ View All Goals</button>
        </section>
    )
}

export default SavingGoals
