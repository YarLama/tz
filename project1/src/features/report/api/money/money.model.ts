export interface Money {
  division: "B2B" | "B2C" | "B2G";
  date: string;
  amount: number;
  type: "expenses" | "income" | "revenue" | "debt";
  name: string;
}
