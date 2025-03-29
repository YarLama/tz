import { ExpenseItem } from "@/shared/ui";
import "./index.scss";
import { Money } from "../../api/money/money.model";
import { calculateDebtAndExpenses } from "../../lib/calculate";

interface ProblemZoneProps {
  moneyData: Money[];
  warningLowerLimit: number;
  criticalLowerLimit: number;
}

export const ProblemZone: React.FC<ProblemZoneProps> = ({
  moneyData,
  warningLowerLimit,
  criticalLowerLimit,
}) => {

  const expenseData = calculateDebtAndExpenses(moneyData) 
  const filteredData =  Object.entries(expenseData).filter(([_, value]) => value >= warningLowerLimit)

  return (
    <div className="problem-zone">
      <h2>Проблемные зоны</h2>
      <div className="problem-items">
        {filteredData.map((expense, i) => {
            return (
              <div className="problem-item" key={i}>
                <ExpenseItem
                  value={expense[1]}
                  expenseName={expense[0]}
                  currencyRegion="ru"
                  withMark
                  background={
                    expense[1] < criticalLowerLimit ? "yellow" : "red"
                  }
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
