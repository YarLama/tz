import { Money } from '../api/money/money.model.ts'

export function generateMoneyData(names: string[]): Money[] {
  const divisions: Array<"B2B" | "B2C"> = ["B2B", "B2C"];
  const types: Array<"expenses" | "income" | "revenue" | "debt"> = [
    "expenses",
    "income",
    "revenue",
    "debt",
  ];

  const startDate = new Date("2025-01-01T00:00:00.000Z");
  const daysInYear = 365;

  const result: Money[] = [];

  for (let i = 0; i < daysInYear; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    const dateString = currentDate.toISOString();

    const division = divisions[Math.floor(Math.random() * divisions.length)];
    const amount = Math.floor(Math.random() * (20000 - (-15000) + 1)) + (-15000);
    const type = types[Math.floor(Math.random() * types.length)];
    const name = names[Math.floor(Math.random() * names.length)];

    result.push({
      division,
      date: dateString,
      amount,
      type,
      name,
    });
  }

  return result;
}
