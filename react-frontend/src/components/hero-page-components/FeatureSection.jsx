import FeatureCard from "./FeatureCard";

import analitic from "../../assets/images/icons/analytics-icon.svg"
import budget from "../../assets/images/icons/budgets-icon.svg"
import optimize from "../../assets/images/icons/optimization-icon.svg"

function FeatureSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard
        icon= {analitic}
        title="Real-time Analytics"
        description="Visualize your progress towards big purchases or retirement with dynamic progress trackers."
      />
      <FeatureCard
        icon= {budget}
        title="Smart Budgeting"
        description="Easily categorize expenses and set monthly limits with our intelligent auto-tagging system."
      />
      <FeatureCard
        icon= {optimize}
        title="Optimize Wealth"
        description="Get driven insights to grow your net worth and minimize unnecessary subscription costs."
      />
    </div>
  );
}

export default FeatureSection