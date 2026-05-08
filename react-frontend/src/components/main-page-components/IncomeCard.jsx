const IncomeCard = ({header, progressStyle, money, percentage}) => {
    return (
        <div className="income-card flex_center">
              <p className="gray-text semibold">{header}</p>
              <h3 className="income-card_title bold_font h3_style black-text">
                {money}
              </h3>
              <progress
                max="100"
                value={`${percentage}`}
                className={`income-card_prog-bar ${progressStyle}`}
              ></progress>
        </div>
    )
}

export default IncomeCard