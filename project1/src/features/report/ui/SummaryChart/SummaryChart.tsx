import { ExpenseItem, LineChart, SummaryItem } from "@/shared/ui";
import "./index.scss";
import { DivisionData, FinancialReport } from "../../lib/calculate";
import { useState } from "react";
import { ChartOptions } from "chart.js";

interface SummaryChartProps {
  financialData: FinancialReport;
}

const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
  },
  scales: {
    y: {
      ticks: { display: false },
      border: {display: false},
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const chartLabels = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

export const SummaryChart: React.FC<SummaryChartProps> = ({
  financialData,
}) => {
  const [currentDivision, setCurrentDivision] = useState<"B2B" | "B2C" | "All">(
    "All",
  );
  const [randomValues] = useState(() => ({
    value1: parseFloat((Math.random() * 200 - 100).toFixed(1)),
    value2: parseFloat((Math.random() * 200 - 100).toFixed(1)),
    value3: parseFloat((Math.random() * 200 - 100).toFixed(1)),
  }));

  const calculateForYear = (data: Record<string, number>) => {
    return Object.values(data).reduce((sum, value) => sum + value, 0);
  };

  const getSummForYear = (data: DivisionData) => {
    return {
      income: calculateForYear(data.income),
      revenue: calculateForYear(data.revenue),
      debt: calculateForYear(data.debt),
      expense: calculateForYear(data.expense),
      summary: calculateForYear(data.summary),
    };
  };

  const b2b = financialData.B2B;
  const b2c = financialData.B2C;
  const all = financialData.All;

  const UnionSummary = {
    B2B: getSummForYear(b2b),
    B2C: getSummForYear(b2c),
    All: getSummForYear(all),
  };

  const summaryData = Object.values(financialData[currentDivision].summary)
  const maxSummaryValue = Math.max(...summaryData);
  const maxIndex = summaryData.indexOf(maxSummaryValue);
  const pointRadiusArray = summaryData.map((_, i) => {
    return i === maxIndex ? 8 : 0
  })

  const chartDataset = [
    {
      label: "Получка",
      data: Object.values(financialData[currentDivision].revenue),
      borderColor: "#73cf7a",
      backgroundColor: "#73cf7a",
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 0,
    },
    {
      label: "Затраты",
      data: Object.values(financialData[currentDivision].expense),
      borderColor: "#30c7dc",
      backgroundColor: "#30c7dc",
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 0,
    },
    {
      label: "Прибыль",
      data: Object.values(financialData[currentDivision].income),
      borderColor: "#30c7dc",
      backgroundColor: "#30c7dc",
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 0,
    },
    {
      label: "Задолженности",
      data: Object.values(financialData[currentDivision].debt),
      borderColor: "#f7b731",
      backgroundColor: "#f7b731",
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 0,
    },
    {
      label: "Итого",
      data: Object.values(financialData[currentDivision].summary),
      borderColor: "#ac74fc",
      backgroundColor: "#ac74fc",
      tension: 0.4,
      pointRadius: pointRadiusArray,
      pointHoverRadius: pointRadiusArray.map(r => r ? 8 : 0)
    },
  ];

  const chartData = {
    labels: chartLabels,
    datasets: chartDataset,
  };

  return (
    <div className="summary-chart-content">
      <div className="summary-chart-items">
        <SummaryItem
          name="Итого"
          currencyRegion="ru"
          procent={randomValues.value1}
          summary={UnionSummary.All.summary}
          active={currentDivision === "All"}
          onClick={() => setCurrentDivision("All")}
        />
        <SummaryItem
          name="B2B"
          currencyRegion="ru"
          procent={randomValues.value2}
          summary={UnionSummary.B2B.summary}
          active={currentDivision === "B2B"}
          onClick={() => setCurrentDivision("B2B")}
        />
        <SummaryItem
          name="B2C"
          currencyRegion="ru"
          procent={randomValues.value3}
          summary={UnionSummary.B2C.summary}
          active={currentDivision === "B2C"}
          onClick={() => setCurrentDivision("B2C")}
        />
      </div>
      <div className="summary-chart-line">
        <div className="chart-sort">
          <h2>Общая статистика</h2>
          <div className="time">
            <span>Неделя</span>
            <span>Месяц</span>
            <span className="selected">Год</span>
          </div>
        </div>
        <div className="chart">
          <LineChart options={chartOptions} data={chartData} />
        </div>
        <div className="chart-lines-label">
          <ExpenseItem
            value={UnionSummary[currentDivision].revenue}
            currencyRegion="ru"
            expenseName="Получка"
            background="green"
          />
          <ExpenseItem
            value={UnionSummary[currentDivision].expense}
            currencyRegion="ru"
            expenseName="Затраты"
            background="blue"
            withMark
          />
          <ExpenseItem
            value={UnionSummary[currentDivision].income}
            currencyRegion="ru"
            expenseName="Прибыль"
            background="blue"
            withMark
          />
          <ExpenseItem
            value={UnionSummary[currentDivision].debt}
            currencyRegion="ru"
            expenseName="Задолженность"
            background="yellow"
          />
          <ExpenseItem
            value={UnionSummary[currentDivision].summary}
            currencyRegion="ru"
            expenseName="Итого"
            background="purple"
          />
        </div>
      </div>
    </div>
  );
};
