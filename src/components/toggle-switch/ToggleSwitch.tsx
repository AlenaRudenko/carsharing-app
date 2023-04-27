import "./styles.scss";
import { useState } from "react";

interface IProps {
  toggleSwitch?: () => void;
  isChecked: boolean;
}

export const ToggleSwitch = ({ toggleSwitch, isChecked }: IProps) => {
  return (
    <div className="toggle">
      <input
        checked={isChecked}
        className="toggle__input"
        type="checkbox"
        id="myToggle"
      />
      <div className="toggle__fill" onClick={toggleSwitch}></div>
    </div>
  );
};
