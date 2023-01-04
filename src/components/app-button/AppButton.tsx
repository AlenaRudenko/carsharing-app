import { useState } from "react";
import { COLORS } from "../../constants/colors";
import "./styles.scss";

interface IProps {
  size?: "regular" | "small" | "large";
  text: string;
  marginTop?: number;
  marginBottom?: number;
  onClick?: () => void;
  isDisabled?: boolean;
  backgroundColor?: string;
}

export const AppButton = ({
  marginTop,
  marginBottom = 0,
  size = "regular",
  text,
  onClick,
  isDisabled,
  backgroundColor = COLORS.PRIMARY,
}: IProps) => {
  const [hovered, setHovered] = useState(false);
  const color = isDisabled ? COLORS.GREY : backgroundColor;
  const onMouseEnter = () => setHovered(true);
  const onMouseLeave = () => setHovered(false);
  const onFocus = () => setHovered(true);
  const onBlur = () => setHovered(false);

  return (
    <button
      disabled={isDisabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onBlur={onBlur}
      onFocus={onFocus}
      onClick={onClick}
      style={{ marginBottom, marginTop, backgroundColor: color }}
      className={`button button--${size} ${isDisabled && "button--disabled"}`}
    >
      {text}
    </button>
  );
};
