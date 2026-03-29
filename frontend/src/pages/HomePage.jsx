import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import useTransectionsStore from "../stores/useTransectionsStore";
import { useParams } from "react-router-dom";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
);

const Dashboard = () => {
  const { transections, getTransections } = useTransectionsStore();
  const { accountId } = useParams();

  useEffect(() => {
    getTransections(accountId);
  }, [accountId]);

  // 🔹 Calculate totals
  const income = transections
    ?.filter((t) => t.transectionType === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transections
    ?.filter((t) => t.transectionType === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // 🔹 Category aggregation
  const categoryMap = {};
  transections?.forEach((t) => {
    const cat = t.category?.[0]?.categoryName || "Other";
    if (!categoryMap[cat]) categoryMap[cat] = 0;
    categoryMap[cat] += t.amount;
  });

  const categoryLabels = Object.keys(categoryMap);
  const categoryValues = Object.values(categoryMap);

  // 🔹 Bar Chart (Income vs Expense)
  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [income || 0, expense || 0],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderRadius: 6,
      },
    ],
  };

  // 🔹 Doughnut Chart
  const doughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: [
          "#8b5cf6",
          "#3b82f6",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#080b14] text-white px-6 py-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-200">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your finances</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400">Total Income</p>
          <p className="text-lg font-semibold text-green-400">
            ₹ {income || 0}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400">Total Expense</p>
          <p className="text-lg font-semibold text-red-400">₹ {expense || 0}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-sm text-gray-400">Balance</p>
          <p className="text-lg font-semibold text-purple-400">
            ₹ {(income || 0) - (expense || 0)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-[320px] flex flex-col">
          <h2 className="text-sm text-gray-400 mb-3">Income vs Expense</h2>
          <div className="flex-1">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-[320px] flex flex-col">
          <h2 className="text-sm text-gray-400 mb-3">Category Breakdown</h2>
          <div className="flex-1">
            <Doughnut
              data={doughnutData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
