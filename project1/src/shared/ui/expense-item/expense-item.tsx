import { formatNumber } from "@/shared/lib/numbers";
import { CircleIcon, CircleIconProps } from "@/shared/ui";
import "./index.scss";

interface ExpenseItemProps extends CircleIconProps {
  currencyRegion: "ru";
  expenseName: string;
  value: number;
}

const currencySignList = {
  ru: "₽",
} as const;

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
  currencyRegion = "ru",
  expenseName,
  value,
  background,
  withMark
}) => {
  const className = ["expense-ui-item"];

  return (
    <div className={className.join(" ")}>
      <div className="icon-wrapper">
        <CircleIcon background={background} withMark={withMark}/>
      </div>
      <div className="text-wrapper">
        <div className="name-wrapper">{expenseName}</div>
        <div className="value-wrapper">
          <span className="sign">{currencySignList[currencyRegion]}</span>
          <span className="value">{formatNumber(value)}</span>
        </div>
      </div>
    </div>
  );
};
