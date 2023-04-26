import "./styles.scss";
import { AppIcon } from "../app-icon/AppIcon";
import { useState } from "react";

interface IProps {
  descrintion: string;
  fontSize?: string;
  left?: string;
  top?: string;
}

export const HelpModal = ({ descrintion, fontSize, left, top }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div
        className={`service__help service__help${isVisible && "--active"}`}
        style={{ fontSize: fontSize, top: top, left: left }}
      >
        <span>{descrintion}</span>
      </div>
      <div
        onMouseOver={() => {
          setIsVisible(true);
        }}
        onMouseOut={() => {
          setIsVisible(false);
        }}
      >
        <AppIcon icon={"HelpCircle"} />
      </div>
    </>
  );
};
