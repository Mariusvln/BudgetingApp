const IncomeCard = ({header, money, percentage, tone = "primary"}) => {
    const barClass = tone === "warning" ? "bg-warning" : "bg-primary";

    return (
        <div className="flex min-h-44 flex-col justify-center gap-3 rounded-3xl border border-base-300 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--color-base-100)_94%,var(--color-primary)),var(--color-base-100))] p-4 shadow-[0_16px_36px_color-mix(in_oklch,var(--color-base-content)_7%,transparent)]">
              <p className="text-sm font-semibold text-base-content/55">{header}</p>
              <h3 className="mb-2 text-3xl font-extrabold tracking-tight text-base-content">
                {money}
              </h3>
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-base-content/45">
                <span>Progress</span>
                <span>{percentage}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-base-300">
                <div
                  className={`h-full rounded-full ${barClass} transition-[width] duration-700 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
        </div>
    )
}

export default IncomeCard
