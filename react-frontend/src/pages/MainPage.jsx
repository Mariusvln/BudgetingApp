import DashboardMobile from "../components/main-page-components/DashboardMobile";
import DashboardHeaderMobile from "../components/main-page-components/DashboardHeaderMobile"
import DashboardDesktop from "../components/main-page-components/DashboardDesktop";
import DashboardHeaderDesktop from "../components/main-page-components/DashboardHeaderDesktop";
import TransactionNav from "../components/TransactionNav";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { formatCurrency as formatMoney } from "../utils/currency";

const MainPage = () => {
    const { user } = useAuth();

    const [incomeItems, setIncomeItems] = useState([]);
    const [expenseItems, setExpenseItems] = useState([]);
    const [categoryLimits, setCategoryLimits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
  
    const getDateRange = () => {
      const today = new Date();
      return {
        start: formatDate(new Date(today.getFullYear(), today.getMonth(), 1)),
        end: formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0)),
      };
    };
  
    const dateRange = getDateRange();
    const dateStart = dateRange.start;
    const dateEnd = dateRange.end;

    const fetchDashboardData = useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const [incomeResponse, expenseResponse, budgetResponse] = await Promise.all([
          fetch(`http://localhost:8080/api/app/incomes/`, {
            credentials: "include",
          }),
          fetch(`http://localhost:8080/api/app/expenses/`, {
            credentials: "include",
          }),
          fetch(`http://localhost:8080/api/app/budget/`, {
            credentials: "include",
          }),
        ]);
  
        if (!incomeResponse.ok || !expenseResponse.ok || !budgetResponse.ok) {
          throw new Error("Unable to load dashboard data");
        }

        const [incomesResponseData, expensesResponseData, budgetResponseData] = await Promise.all([
          incomeResponse.json(),
          expenseResponse.json(),
          budgetResponse.json(),
        ]);

        setIncomeItems(Array.isArray(incomesResponseData) ? incomesResponseData : []);
        setExpenseItems(Array.isArray(expensesResponseData) ? expensesResponseData : []);
        setCategoryLimits(Array.isArray(budgetResponseData) ? budgetResponseData : []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Dashboard data could not be loaded");
        setIncomeItems([]);
        setExpenseItems([]);
        setCategoryLimits([]);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchDashboardData();
    }, [fetchDashboardData]);

    const dashboardTotals = useMemo(() => {
      const monthlyIncomeItems = incomeItems.filter(
        (income) => income.date >= dateStart && income.date <= dateEnd,
      );
      const monthlyExpenseItems = expenseItems.filter(
        (expense) => expense.date >= dateStart && expense.date <= dateEnd,
      );
      const totalIncome = monthlyIncomeItems.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0,
      );
      const totalExpenses = monthlyExpenseItems.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0,
      );
      const monthlySpending = totalExpenses;
      const monthlyIncome = totalIncome;
      const balance = totalIncome - totalExpenses;
      const monthlySavings = monthlyIncome - monthlySpending;
      const savingsRatio =
        totalIncome > 0 ? Math.max(0, ((totalIncome - totalExpenses) / totalIncome) * 100) : 0;
      const expensesRatio =
        totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0;
      const incomeProgress = totalIncome > 0 ? 100 : 0;
      const expenseTotalsByCategory = monthlyExpenseItems.reduce((totals, expense) => {
        const categoryId = Number(expense.category);
        totals[categoryId] = (totals[categoryId] || 0) + (Number(expense.amount) || 0);
        return totals;
      }, {});
      const budgetGoals = categoryLimits
        .filter((limit) => limit.categoryType === "EXPENSE")
        .map((limit) => {
          const spent = expenseTotalsByCategory[Number(limit.categoryId)] || 0;
          const maxLimit = Number(limit.maxLimit) || 0;

          return {
            id: limit.id,
            name: limit.categoryName,
            spent,
            maxLimit,
            percent: maxLimit > 0 ? Math.min((spent / maxLimit) * 100, 100) : 0,
          };
        })
        .sort((left, right) => right.percent - left.percent)
        .slice(0, 2);

      return {
        balance,
        budgetGoals,
        expensesRatio,
        incomeProgress,
        monthlyIncome,
        monthlySavings,
        monthlySpending,
        savingsRatio,
        totalExpenses,
        totalIncome,
      };
    }, [categoryLimits, dateEnd, dateStart, expenseItems, incomeItems]);

    const formatCurrency = useCallback(
      (value) => formatMoney(value, user?.currency),
      [user?.currency],
    );

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <TransactionNav />

      <div className="min-h-screen pb-28 md:ml-64 md:pb-0">
        <DashboardHeaderMobile />
        <DashboardHeaderDesktop />

        <main className="flex flex-col gap-6 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--color-primary)_10%,transparent),transparent_34rem),var(--color-base-200)]">
          <DashboardMobile balance={formatCurrency(dashboardTotals.balance)} />
          <DashboardDesktop
            formatCurrency={formatCurrency}
            balance={dashboardTotals.balance}
            budgetGoals={dashboardTotals.budgetGoals}
            error={error}
            expenses={formatCurrency(dashboardTotals.totalExpenses)}
            expensesRatio={dashboardTotals.expensesRatio}
            incomeProgress={dashboardTotals.incomeProgress}
            incomeItems={incomeItems}
            incomes={formatCurrency(dashboardTotals.totalIncome)}
            loading={loading}
            monthlySavings={dashboardTotals.monthlySavings}
            monthlySpending={dashboardTotals.monthlySpending}
            expenseItems={expenseItems}
            savingsRatio={dashboardTotals.savingsRatio}
          />
        </main>
      </div>
    </div>
  );
};

export default MainPage;
