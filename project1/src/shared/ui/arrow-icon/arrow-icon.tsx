import Next from "@/shared/assets/icons/next.svg?react";
import "./index.scss";

interface ArrowIconProps extends React.SVGProps<SVGElement> {
  enabled?: boolean;
  direction?: "back" | "forward";
  style?: React.CSSProperties;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({
  width = 80,
  height = 80,
  enabled = true,
  direction = "forward",
  style,
  ...props
}) => {
  const className = [
    "arrow-ui-icon",
    `${enabled ? "enabled" : "disabled"}`,
    direction,
  ];
  return (
    <Next
      width={width}
      height={height}
      className={className.join(" ")}
      style={style}
      onClick={enabled ? props.onClick : undefined}
      {...props}
    />
  );
};
