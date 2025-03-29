import "./index.scss";

export interface CircleIconProps {
  background?: "red" | "yellow" | "blue" | "green" | "purple";
  withMark?: boolean;
}

export const CircleIcon: React.FC<CircleIconProps> = ({
  background = "green",
  withMark = false,
}) => {
  const className = ["circle-ui-icon", background, withMark && "exclamation-mark"];

  return <div className={className.filter(Boolean).join(" ")}></div>;
};
