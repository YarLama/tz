import { Money } from "../api/money/money.model.ts";

export function calculateDebtAndExpenses(
  moneyData: Money[],
): Record<string, number> {
  const result: Record<string, number> = {};

  moneyData.forEach((item) => {
    if (item.type === "debt" || item.type === "expenses") {
      if (!result[item.name]) {
        result[item.name] = 0;
      }
      result[item.name] += item.amount;
    }
  });

  return result;
}

export type MonthlyData = Record<string, number>;
export type DivisionData = {
  income: MonthlyData;
  revenue: MonthlyData;
  debt: MonthlyData;
  expense: MonthlyData;
  summary: MonthlyData;
};
export type FinancialReport = {
  B2B: DivisionData;
  B2C: DivisionData;
  All: DivisionData;
};

export function generateFinancialReport(data: Money[]): FinancialReport {
  const result: FinancialReport = {
    B2B: createEmptyDivisionData(),
    B2C: createEmptyDivisionData(),
    All: createEmptyDivisionData()
  };

  data.forEach(item => {
    const month = item.date.slice(0, 7);     const amount = parseFloat(item.amount.toFixed(2));
    const type = item.type === 'expenses' ? 'expense' : item.type;

    if (item.division === 'B2B' || item.division === 'B2C') {
      result[item.division][type][month] = (result[item.division][type][month] || 0) + amount;
    }

    result.All[type][month] = (result.All[type][month] || 0) + amount;
  });

  calculateSummaries(result.B2B);
  calculateSummaries(result.B2C);
  calculateSummaries(result.All);

  return result;
}

function createEmptyDivisionData(): DivisionData {
  return {
    income: {},
    revenue: {},
    debt: {},
    expense: {},
    summary: {}
  };
}

function calculateSummaries(divisionData: DivisionData): void {
  const months = new Set<string>([
    ...Object.keys(divisionData.income),
    ...Object.keys(divisionData.revenue),
    ...Object.keys(divisionData.debt),
    ...Object.keys(divisionData.expense)
  ]);

  months.forEach(month => {
    divisionData.summary[month] = parseFloat((
      (divisionData.income[month] || 0) +
      (divisionData.revenue[month] || 0) -
      (divisionData.debt[month] || 0) -
      (divisionData.expense[month] || 0)
    ).toFixed(2));
  });
}
