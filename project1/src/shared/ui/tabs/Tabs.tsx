import { Dispatch, ReactNode, SetStateAction, useRef, useState } from "react";
import "./index.scss";
import { ArrowIcon } from "@/shared/ui";

interface TabsProps {
  tabs: {
    label: string;
    element: ReactNode;
  }[];
  activeTabIndex?: number;
  activeTabSetter?: Dispatch<SetStateAction<number>>;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs = [],
  activeTabIndex = 0,
  activeTabSetter
}) => {
  const [activeTab, setActiveTab] = useState<number>(activeTabIndex);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTab = (index: number) => {
    if (!tabsContainerRef.current || index < 0 || index >= tabs.length) return;

    setActiveTab(index);
    if (activeTabSetter) activeTabSetter(index);

    const tabElement = tabsContainerRef.current.children[index] as HTMLElement;
    if (!tabElement) return;

    tabElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleArrowClick = (position: 1 | -1): void => {
    if (tabsContainerRef.current) {
      return position > 0
        ? scrollToTab(activeTab + 1)
        : scrollToTab(activeTab - 1);
    }
  };

  return (
    <div className="tabs-ui">
      <div className="tabs-tools">
        <ArrowIcon
          onClick={() => handleArrowClick(-1)}
          style={{ marginRight: "-10px" }}
          direction="back"
          enabled={activeTab + 1 !== 1}
        />
        <ArrowIcon
          onClick={() => handleArrowClick(1)}
          style={{ marginLeft: "-10px" }}
          enabled={activeTab + 1 !== tabs.length}
        />
      </div>
      <div className="tabs-items" ref={tabsContainerRef}>
        {tabs.map((tab, i) => (
          <div
            className={`tabs-item${i === activeTab ? " active" : ""}`}
            key={i}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};
