const IncomeCard = ({header, progressStyle, money, percentage}) => {
    return (
        <div className="income-card">
              <p className="text-sm font-semibold text-base-content/55">{header}</p>
              <h3 className="income-card_title text-3xl font-extrabold tracking-tight text-base-content">
                {money}
              </h3>
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-base-content/45">
                <span>Progress</span>
                <span>{percentage}%</span>
              </div>
              <progress
                max="100"
                value={`${percentage}`}
                className={`income-card_prog-bar ${progressStyle}`}
              ></progress>
        </div>
    )
}

export default IncomeCard
