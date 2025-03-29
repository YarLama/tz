import { ProblemZone } from "../ProblemZone/ProblemZone";
import "./index.scss";
import { useEffect, useState } from "react";
import { moneyApi } from "../../api/money/money.api";
import { Money } from "../../api/money/money.model";
import { SummaryChart } from "../SummaryChart/SummaryChart";
import { generateFinancialReport } from "../../lib/calculate";

export const SummaryReportInnerCompany = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moneyData, setMoneyData] = useState<Money[]>([]);

  useEffect(() => {
    setIsLoading(true);
    moneyApi
      .getAllOperations()
      .then((data) => {
        setMoneyData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="summary-report-inner-company">
      <h1>Сводный отчет</h1>
      <div className="summary-report-content">
        <SummaryChart financialData={generateFinancialReport(moneyData)} />
        <ProblemZone
          moneyData={moneyData}
          warningLowerLimit={10_000}
          criticalLowerLimit={50_000}
        />
      </div>
    </div>
  );
};
