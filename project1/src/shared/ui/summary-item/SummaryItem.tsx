import { formatNumber } from "@/shared/lib/numbers";
import "./index.scss";

interface SummaryItemProps {
  currencyRegion: "ru";
  name: string;
  procent: number;
  summary: number;
  active?: boolean;
  onClick?: () => void;
}

const currencySignList = {
  ru: "₽",
} as const;

export const SummaryItem: React.FC<SummaryItemProps> = ({
  currencyRegion,
  name,
  procent,
  summary,
  active = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`summary-ui-item${active ? " active" : ""}`}
    >
      <span
        className={`summary-procent${procent < 0 ? " negative" : " positive"}`}
      >
        {`${procent} %`}
      </span>
      <span className="summary-amount">{`${currencySignList[currencyRegion]} ${formatNumber(summary)}`}</span>
      <span className="summary-name">{name}</span>
    </div>
  );
};
