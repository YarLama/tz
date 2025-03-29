import { useState } from "react";
import "./index.scss";
import { Tabs } from "@/shared/ui";
import { SummaryReportInnerCompany } from "@/features/report";

const testTabs = [
  {
    label: "Свод данных по сотрудникам",
    element: <div>404</div>,
  },
  {
    label: "Сводный отчет внутри компании",
    element: <SummaryReportInnerCompany />,
  },
  {
    label: "Сводный отчет по сделкам",
    element: <div>404</div>,
  },
];

export const ReportPage = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <>
      <div className="report-tools">
        <Tabs
          tabs={testTabs}
          activeTabIndex={activeTab}
          activeTabSetter={setActiveTab}
        />
      </div>
      <div className="report-content">{testTabs[activeTab].element}</div>
    </>
  );
};
