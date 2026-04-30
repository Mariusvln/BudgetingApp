import { useCallback, useState } from "react";
import "../../assets/styles/Dashboard.css";

const BalanceCard = () => {

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const getCurrentMonth = () => {
    return 
  }

  const fetchBalance = useCallback(
    async () => {
      setLoading(true)
      try {
        const incomeResponse = await fetch(
          `http://localhost:8080/api/app/fetchIncomes`,
          {credentials: "include"},
        );

        const expenseResponse = await fetch(
          `http://localhost:8080/api/app/fetchExpenses`
        )

        if (!incomeResponse.ok || !expenseResponse.ok) throw new Error("Network response was not okay");
        const [incomes, expenses] = await Promise.all
        setIncomes(incomes);
        setExpenses(expenses)
      } catch (error) {
        console.error("Error fetching incomes:", error)
      } finally {
        setLoading(false)
      }
    }, [])

  const fetchCategories = useCallback(async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categories", {
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
  
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    }, []);

    return (
        <div className="balance-card-bg p-[32px] min-h-[240px] flex flex-col grow-30 basis-[600px] justify-center gap-[5%]">
          <div class="flex items-center gap-1.5 text-sm text-center black-text semibold bg-[#0000001a] pl-3 py-0.5 w-23 rounded-2xl">
          <span class="badge size-2 p-0 mt-0.5 bg-black"></span>
            SYNCED
          </div>
          <div>
          <p className="tracking-wide semibold text-[#0F172AB2]">Total Balance</p>
          <h1 className="bold-font text-6xl black-text tracking-tight">${incomes}</h1>
          </div>
          <div>
          <h5 className="semibold text-lg mt-3 text-[#0F172AB2]">MONTHLY SPENDING</h5>
          <h4 className="black-text bold-font text-2xl">$3,120.40</h4>
          </div>
        </div>
    )
}

export default BalanceCard