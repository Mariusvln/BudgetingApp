import { useCallback, useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/useTheme";
import {
  convertFromEuro,
  normalizeCurrency,
} from "../../utils/currency";

const API_BASE = "http://localhost:8080/api";

const toNumber = (value) => Number(value) || 0;
const roundCurrency = (value) => Math.round((toNumber(value) + Number.EPSILON) * 100) / 100;
const parseLocalDate = (date) => new Date(`${date}T00:00:00`);
const getMonthKey = (date) => String(date || "").slice(0, 7);

const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatShortDate = (date) => {
  const parsedDate =
    typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? parseLocalDate(date)
      : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return String(date ?? "");

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(parsedDate);
};

const formatReadableDate = (date) => {
  const parsedDate =
    typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)
      ? parseLocalDate(date)
      : new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return String(date ?? "");

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const formatMonthLabel = (monthKey) => {
  const parsedDate = parseLocalDate(`${monthKey}-01`);

  if (Number.isNaN(parsedDate.getTime())) return String(monthKey ?? "");

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};

const getCategoryName = (categoryId, categories) =>
  categories.find((category) => Number(category.id) === Number(categoryId))?.name ||
  `Category #${categoryId}`;

const groupByCategory = (transactions, categories) => {
  const totals = transactions.reduce((acc, transaction) => {
    const key = Number(transaction.category) || 0;
    acc[key] = (acc[key] || 0) + toNumber(transaction.amount);
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([categoryId, total]) => ({
      categoryId: Number(categoryId),
      name: getCategoryName(categoryId, categories),
      total: roundCurrency(total),
    }))
    .sort((left, right) => right.total - left.total);
};

const getThemeColors = () => {
  const styles = getComputedStyle(document.documentElement);
  const read = (name, fallback) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    base100: read("--color-base-100", "#ffffff"),
    base300: read("--color-base-300", "#d1d5db"),
    content: read("--color-base-content", "#111827"),
    primary: read("--color-primary", "#22c55e"),
    secondary: read("--color-secondary", "#38bdf8"),
    accent: read("--color-accent", "#f43f5e"),
    success: read("--color-success", "#22c55e"),
    error: read("--color-error", "#ef4444"),
    warning: read("--color-warning", "#f59e0b"),
    info: read("--color-info", "#0ea5e9"),
  };
};

function AnalyticChart({ dateStart, dateEnd, setDateStart, setDateEnd }) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [allIncomes, setAllIncomes] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [rangeIncomes, setRangeIncomes] = useState([]);
  const [rangeExpenses, setRangeExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [themeColors, setThemeColors] = useState(getThemeColors);

  const currency = normalizeCurrency(user?.currency);

  const formatCurrency = useCallback(
    (value) => {
      const safeValue = roundCurrency(value);

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(convertFromEuro(safeValue, currency));
    },
    [currency],
  );

  const formatCompactCurrency = useCallback(
    (value) => {
      const safeValue = roundCurrency(value);

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        currencyDisplay: "narrowSymbol",
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(convertFromEuro(safeValue, currency));
    },
    [currency],
  );

  useEffect(() => {
    setThemeColors(getThemeColors());
  }, [theme]);

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [
        incomeRangeResponse,
        expenseRangeResponse,
        incomeAllResponse,
        expenseAllResponse,
        categoriesResponse,
      ] = await Promise.all([
        fetch(
          `${API_BASE}/app/incomes/fromDateStartToDateFinish?dateStart=${dateStart}&dateEnd=${dateEnd}`,
          { credentials: "include" },
        ),
        fetch(
          `${API_BASE}/app/expenses/fromDateStartToDateFinish?dateStart=${dateStart}&dateEnd=${dateEnd}`,
          { credentials: "include" },
        ),
        fetch(`${API_BASE}/app/incomes/`, { credentials: "include" }),
        fetch(`${API_BASE}/app/expenses/`, { credentials: "include" }),
        fetch(`${API_BASE}/categories`, { credentials: "include" }),
      ]);

      if (
        !incomeRangeResponse.ok ||
        !expenseRangeResponse.ok ||
        !incomeAllResponse.ok ||
        !expenseAllResponse.ok ||
        !categoriesResponse.ok
      ) {
        throw new Error("Failed to fetch analytics data");
      }

      const [
        incomeRangeData,
        expenseRangeData,
        incomeAllData,
        expenseAllData,
        categoriesData,
      ] = await Promise.all([
        incomeRangeResponse.json(),
        expenseRangeResponse.json(),
        incomeAllResponse.json(),
        expenseAllResponse.json(),
        categoriesResponse.json(),
      ]);

      setRangeIncomes(Array.isArray(incomeRangeData) ? incomeRangeData : []);
      setRangeExpenses(Array.isArray(expenseRangeData) ? expenseRangeData : []);
      setAllIncomes(Array.isArray(incomeAllData) ? incomeAllData : []);
      setAllExpenses(Array.isArray(expenseAllData) ? expenseAllData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setError(error.message || "Failed to fetch analytics data");
      setRangeIncomes([]);
      setRangeExpenses([]);
      setAllIncomes([]);
      setAllExpenses([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [dateEnd, dateStart]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  const years = useMemo(() => {
    const yearSet = new Set([
      parseLocalDate(dateStart).getFullYear(),
      parseLocalDate(dateEnd).getFullYear(),
    ]);

    [...allIncomes, ...allExpenses].forEach((transaction) => {
      if (transaction.date) yearSet.add(parseLocalDate(transaction.date).getFullYear());
    });

    return [...yearSet].filter(Boolean).sort((left, right) => left - right);
  }, [allExpenses, allIncomes, dateEnd, dateStart]);

  const monthKeys = useMemo(() => {
    const keys = [];
    const current = new Date(
      parseLocalDate(dateStart).getFullYear(),
      parseLocalDate(dateStart).getMonth(),
      1,
    );
    const last = new Date(
      parseLocalDate(dateEnd).getFullYear(),
      parseLocalDate(dateEnd).getMonth(),
      1,
    );

    while (current <= last) {
      keys.push(`${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`);
      current.setMonth(current.getMonth() + 1);
    }

    return keys;
  }, [dateEnd, dateStart]);

  const dayKeys = useMemo(() => {
    const keys = [];
    const current = parseLocalDate(dateStart);
    const last = parseLocalDate(dateEnd);

    while (current <= last) {
      keys.push(formatDateKey(current));
      current.setDate(current.getDate() + 1);
    }

    return keys;
  }, [dateEnd, dateStart]);

  const monthlyData = useMemo(
    () =>
      monthKeys.map((month) => {
        const income = rangeIncomes
          .filter((transaction) => getMonthKey(transaction.date) === month)
          .reduce((sum, transaction) => sum + toNumber(transaction.amount), 0);
        const expense = rangeExpenses
          .filter((transaction) => getMonthKey(transaction.date) === month)
          .reduce((sum, transaction) => sum + toNumber(transaction.amount), 0);

        return {
          month,
          income: roundCurrency(income),
          expense: roundCurrency(expense),
          cashFlow: roundCurrency(income - expense),
        };
      }),
    [monthKeys, rangeExpenses, rangeIncomes],
  );

  const dailyFlowData = useMemo(
    () =>
      dayKeys.map((day) => {
        const income = rangeIncomes
          .filter((transaction) => transaction.date === day)
          .reduce((sum, transaction) => sum + toNumber(transaction.amount), 0);
        const expenses = rangeExpenses
          .filter((transaction) => transaction.date === day)
          .reduce((sum, transaction) => sum + toNumber(transaction.amount), 0);

        return {
          day,
          income: roundCurrency(income),
          expenses: roundCurrency(expenses),
          netGrowth: roundCurrency(income - expenses),
        };
      }),
    [dayKeys, rangeExpenses, rangeIncomes],
  );

  const sCurveData = useMemo(() => {
    let cumulativeTotal = 0;

    return dailyFlowData.map((item) => {
      cumulativeTotal += item.income + item.expenses;

      return {
        day: item.day,
        total: cumulativeTotal,
      };
    });
  }, [dailyFlowData]);

  const selectedMonthKey = useMemo(() => getMonthKey(dateEnd), [dateEnd]);

  const expenseHeatmap = useMemo(() => {
    const monthStart = parseLocalDate(`${selectedMonthKey}-01`);
    const daysInMonth = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() + 1,
      0,
    ).getDate();
    const firstDayIndex = (monthStart.getDay() + 6) % 7;
    const days = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const dateKey = `${selectedMonthKey}-${String(day).padStart(2, "0")}`;
      const total = allExpenses
        .filter((transaction) => transaction.date === dateKey)
        .reduce((sum, transaction) => sum + toNumber(transaction.amount), 0);

      return {
        date: dateKey,
        day,
        total,
      };
    });
    const maxTotal = Math.max(...days.map((day) => day.total), 0);
    const leadingBlanks = Array.from({ length: firstDayIndex }, (_, index) => ({
      id: `blank-${index}`,
      blank: true,
    }));
    const cells = [
      ...leadingBlanks,
      ...days.map((day) => ({
        ...day,
        level:
          day.total <= 0 || maxTotal <= 0
            ? 0
            : Math.min(4, Math.ceil((day.total / maxTotal) * 4)),
      })),
    ];

    return {
      monthLabel: formatMonthLabel(selectedMonthKey),
      cells,
      total: days.reduce((sum, day) => sum + day.total, 0),
      activeDays: days.filter((day) => day.total > 0).length,
    };
  }, [allExpenses, selectedMonthKey]);

  const incomeCategories = useMemo(
    () => groupByCategory(rangeIncomes, categories).slice(0, 8),
    [categories, rangeIncomes],
  );

  const expenseCategories = useMemo(
    () => groupByCategory(rangeExpenses, categories).slice(0, 8),
    [categories, rangeExpenses],
  );

  const totals = useMemo(() => {
    const totalIncome = rangeIncomes.reduce(
      (sum, transaction) => sum + toNumber(transaction.amount),
      0,
    );
    const totalExpenses = rangeExpenses.reduce(
      (sum, transaction) => sum + toNumber(transaction.amount),
      0,
    );
    const allIncomeTotal = allIncomes.reduce(
      (sum, transaction) => sum + toNumber(transaction.amount),
      0,
    );
    const allExpenseTotal = allExpenses.reduce(
      (sum, transaction) => sum + toNumber(transaction.amount),
      0,
    );

    return {
      netWorth: roundCurrency(allIncomeTotal - allExpenseTotal),
      income: roundCurrency(totalIncome),
      expenses: roundCurrency(totalExpenses),
      cashFlow: roundCurrency(totalIncome - totalExpenses),
    };
  }, [allExpenses, allIncomes, rangeExpenses, rangeIncomes]);

  const chartBase = useMemo(
    () => ({
      chart: {
        background: "transparent",
        foreColor: themeColors.content,
        toolbar: { show: true },
        animations: { enabled: true, speed: 450 },
      },
      dataLabels: { enabled: false },
      grid: {
        borderColor: themeColors.base300,
        strokeDashArray: 4,
      },
      legend: {
        labels: { colors: themeColors.content },
      },
      tooltip: {
        theme:
          theme === "light" ||
          theme === "mint-ice-cream" ||
          theme === "light-green-pure"
            ? "light"
            : "dark",
        y: { formatter: formatCurrency },
      },
    }),
    [formatCurrency, theme, themeColors],
  );

  const dailyFlowOptions = useMemo(
    () => ({
      ...chartBase,
      chart: {
        ...chartBase.chart,
        type: "line",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      colors: ["#f97316"],
      fill: { type: "solid", opacity: 1 },
      markers: {
        size: 4,
        colors: ["#f97316"],
        strokeColors: themeColors.base100,
        strokeWidth: 2,
        hover: { size: 6 },
      },
      stroke: {
        curve: "smooth",
        dashArray: 0,
        lineCap: "round",
        width: 3,
      },
      annotations: {
        xaxis:
          dayKeys.length > 4
            ? [
                {
                  x: dayKeys[Math.floor(dayKeys.length * 0.25)],
                  borderColor: themeColors.info,
                  strokeDashArray: 7,
                },
                {
                  x: dayKeys[Math.floor(dayKeys.length * 0.8)],
                  borderColor: themeColors.info,
                  strokeDashArray: 7,
                },
              ]
            : [],
      },
      tooltip: {
        shared: false,
        intersect: false,
        custom: ({ series, dataPointIndex }) => {
          const day = dailyFlowData[dataPointIndex]?.day;
          const dayFlow = dailyFlowData[dataPointIndex];

          return `
            <div class="analytics-tooltip">
              <div class="analytics-tooltip__date">${formatReadableDate(day)}</div>
              <div class="analytics-tooltip__row">
                <span class="analytics-tooltip__dot" style="background:#f97316"></span>
                <span>Cumulative activity</span>
                <strong>${formatCurrency(series[0]?.[dataPointIndex] ?? 0)}</strong>
              </div>
              <div class="analytics-tooltip__row">
                <span class="analytics-tooltip__dot" style="background:${themeColors.success}"></span>
                <span>Income</span>
                <strong>${formatCurrency(dayFlow?.income ?? 0)}</strong>
              </div>
              <div class="analytics-tooltip__row">
                <span class="analytics-tooltip__dot" style="background:${themeColors.error}"></span>
                <span>Expenses</span>
                <strong>${formatCurrency(dayFlow?.expenses ?? 0)}</strong>
              </div>
            </div>
          `;
        },
      },
      xaxis: {
        categories: dayKeys,
        tickAmount: Math.min(dayKeys.length, 8),
        tooltip: { enabled: false },
        labels: {
          formatter: (value) => formatShortDate(value),
          hideOverlappingLabels: true,
          rotate: 0,
          style: { fontSize: "12px", fontWeight: 700 },
        },
      },
      yaxis: [
        {
          min: 0,
          title: { text: "Cumulative amount", style: { color: themeColors.content } },
          labels: { formatter: formatCompactCurrency },
        },
      ],
    }),
    [chartBase, dailyFlowData, dayKeys, formatCompactCurrency, formatCurrency, themeColors],
  );

  const cashFlowOptions = useMemo(
    () => ({
      ...chartBase,
      chart: { ...chartBase.chart, stacked: false },
      colors: [themeColors.success, themeColors.error, themeColors.info],
      plotOptions: { bar: { borderRadius: 4, columnWidth: "48%" } },
      stroke: { width: [0, 0, 3], curve: "smooth" },
      xaxis: { categories: monthKeys },
      yaxis: [
        { labels: { formatter: formatCompactCurrency } },
        { opposite: true, labels: { formatter: formatCompactCurrency } },
      ],
    }),
    [chartBase, formatCompactCurrency, monthKeys, themeColors],
  );

  const categoryDonutOptions = useCallback(
    (items, type) => ({
      ...chartBase,
      chart: { ...chartBase.chart, type: "donut", toolbar: { show: false } },
      colors:
        type === "INCOME"
          ? [themeColors.primary, themeColors.success, themeColors.info, themeColors.secondary, themeColors.accent]
          : [themeColors.error, themeColors.warning, themeColors.accent, themeColors.info, themeColors.secondary],
      labels: items.map((item) => item.name),
      legend: { position: "right", labels: { colors: themeColors.content } },
      plotOptions: {
        pie: {
          donut: {
            size: "68%",
            labels: {
              show: true,
              value: {
                formatter: formatCurrency,
              },
              total: {
                show: true,
                label: type === "INCOME" ? "Income" : "Expenses",
                formatter: () =>
                  formatCompactCurrency(items.reduce((sum, item) => sum + item.total, 0)),
              },
            },
          },
        },
      },
    }),
    [chartBase, formatCompactCurrency, formatCurrency, themeColors],
  );

  const expenseBarOptions = useMemo(
    () => ({
      ...chartBase,
      chart: { ...chartBase.chart, type: "bar", toolbar: { show: false } },
      colors: [themeColors.accent],
      plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "62%" } },
      xaxis: {
        categories: expenseCategories.map((item) => item.name),
        labels: { formatter: formatCompactCurrency },
      },
      yaxis: { labels: { maxWidth: 120 } },
    }),
    [chartBase, expenseCategories, formatCompactCurrency, themeColors],
  );

  const setYearRange = (year) => {
    setDateStart(`${year}-01-01`);
    setDateEnd(`${year}-12-31`);
  };

  const selectedYear =
    parseLocalDate(dateStart).getFullYear() === parseLocalDate(dateEnd).getFullYear()
      ? parseLocalDate(dateStart).getFullYear()
      : null;

  const summaryCards = [
    { label: "Net Worth", value: totals.netWorth, tone: "text-primary" },
    { label: "Income", value: totals.income, tone: "text-success" },
    { label: "Expenses", value: totals.expenses, tone: "text-error" },
    { label: "Cash Flow", value: totals.cashFlow, tone: totals.cashFlow >= 0 ? "text-info" : "text-error" },
  ];

  const hasAnalyticsData = rangeIncomes.length > 0 || rangeExpenses.length > 0;

  return (
    <div className="mx-auto w-full max-w-[1500px]">
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm lg:flex-row lg:items-end lg:justify-between lg:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Analytics
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Financial overview
          </h1>
          <p className="mt-2 text-sm text-base-content/60">
            Compare income, expenses, categories and cash flow over time.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-base-content/60">Start</span>
            <input
              type="date"
              value={dateStart}
              onChange={(event) => setDateStart(event.target.value)}
              className="input input-bordered h-10 rounded-xl border-base-300 bg-base-100 text-sm text-base-content"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-semibold text-base-content/60">End</span>
            <input
              type="date"
              value={dateEnd}
              onChange={(event) => setDateEnd(event.target.value)}
              className="input input-bordered h-10 rounded-xl border-base-300 bg-base-100 text-sm text-base-content"
            />
          </label>
          <div className="grid gap-1">
            <span className="text-xs font-semibold text-base-content/60">Year</span>
            <div className="flex overflow-hidden rounded-xl border border-base-300 bg-base-100">
              {years.map((year) => (
                <button
                  type="button"
                  key={year}
                  className={`flex h-10 min-w-[4.5rem] items-center justify-center px-4 text-sm font-semibold transition ${
                    selectedYear === year
                      ? "bg-primary text-primary-content hover:bg-primary/90"
                      : "bg-base-100 text-base-content hover:bg-base-200"
                  }`}
                  onClick={() => setYearRange(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid min-h-[420px] place-items-center rounded-2xl border border-base-300 bg-base-100">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-error/30 bg-base-100 p-8 text-center shadow-sm">
          <h2 className="text-lg font-bold text-error">Analytics data unavailable</h2>
          <p className="mt-2 text-sm font-medium text-base-content/65">{error}</p>
        </div>
      ) : (
        <>
          <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div
                className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
                key={card.label}
              >
                <p className="text-sm font-semibold text-base-content/60">
                  {card.label}
                </p>
                <p className={`mt-2 text-2xl font-black ${card.tone}`}>
                  {formatCurrency(card.value)}
                </p>
              </div>
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.15fr_1fr]">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <h2 className="mb-2 text-center text-base font-bold text-base-content">
                S-curve Chart
              </h2>
              {hasAnalyticsData ? (
                <Chart
                  key={`daily-flow-${theme}-${currency}`}
                  options={dailyFlowOptions}
                  series={[
                    {
                      name: "Cumulative activity",
                      type: "line",
                      data: sCurveData.map((item) => item.total),
                    },
                  ]}
                  type="line"
                  height={320}
                />
              ) : (
                <div className="grid h-[320px] place-items-center text-sm font-semibold text-base-content/50">
                  No balance data for this account yet
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <h2 className="mb-2 text-center text-base font-bold text-base-content">
                Income, Expenses and Cash Flow
              </h2>
              <Chart
                key={`cash-${theme}-${currency}`}
                options={cashFlowOptions}
                series={[
                  { name: "Income", type: "column", data: monthlyData.map((item) => item.income) },
                  { name: "Expenses", type: "column", data: monthlyData.map((item) => item.expense) },
                  { name: "Cash Flow", type: "line", data: monthlyData.map((item) => item.cashFlow) },
                ]}
                type="line"
                height={320}
              />
            </div>
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_0.9fr_1.1fr]">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <h2 className="mb-2 text-center text-base font-bold text-base-content">
                Income by Category
              </h2>
              {incomeCategories.length > 0 ? (
                <Chart
                  key={`income-cat-${theme}-${currency}`}
                  options={categoryDonutOptions(incomeCategories, "INCOME")}
                  series={incomeCategories.map((item) => item.total)}
                  type="donut"
                  height={300}
                />
              ) : (
                <div className="grid h-[300px] place-items-center text-sm font-semibold text-base-content/50">
                  No income data
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <h2 className="mb-2 text-center text-base font-bold text-base-content">
                Expenses by Category
              </h2>
              {expenseCategories.length > 0 ? (
                <Chart
                  key={`expense-cat-${theme}-${currency}`}
                  options={categoryDonutOptions(expenseCategories, "EXPENSE")}
                  series={expenseCategories.map((item) => item.total)}
                  type="donut"
                  height={300}
                />
              ) : (
                <div className="grid h-[300px] place-items-center text-sm font-semibold text-base-content/50">
                  No expense data
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <h2 className="mb-2 text-center text-base font-bold text-base-content">
                Top Expense Categories
              </h2>
              {expenseCategories.length > 0 ? (
                <Chart
                  key={`expense-bar-${theme}-${currency}`}
                  options={expenseBarOptions}
                  series={[{ name: "Expenses", data: expenseCategories.map((item) => item.total) }]}
                  type="bar"
                  height={300}
                />
              ) : (
                <div className="grid h-[300px] place-items-center text-sm font-semibold text-base-content/50">
                  No expense data
                </div>
              )}
            </div>
          </section>

          <section className="mt-5 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-base font-bold text-base-content">
                  Monthly Expense Activity
                </h2>
                <p className="mt-1 text-sm font-medium text-base-content/60">
                  {expenseHeatmap.monthLabel} · {expenseHeatmap.activeDays} spending days · {formatCurrency(expenseHeatmap.total)}
                </p>
              </div>
              <div className="expense-heatmap__legend" aria-hidden="true">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`expense-heatmap__cell expense-heatmap__cell--${level}`}
                  />
                ))}
                <span>More</span>
              </div>
            </div>

            <div className="expense-heatmap" aria-label="Monthly expense heatmap">
              <div className="expense-heatmap__days" aria-hidden="true">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              <div className="expense-heatmap__grid">
                {expenseHeatmap.cells.map((cell, index) =>
                  cell.blank ? (
                    <span key={cell.id} className="expense-heatmap__cell expense-heatmap__cell--blank" />
                  ) : (
                    <span
                      key={cell.date}
                      className={`expense-heatmap__cell expense-heatmap__cell--${cell.level}`}
                      title={`${formatReadableDate(cell.date)}: ${formatCurrency(cell.total)}`}
                      aria-label={`${formatReadableDate(cell.date)} expenses ${formatCurrency(cell.total)}`}
                    >
                      <span className="sr-only">
                        {index + 1}: {formatCurrency(cell.total)}
                      </span>
                    </span>
                  ),
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default AnalyticChart;
