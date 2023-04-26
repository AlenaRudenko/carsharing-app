import "./styles.scss";
import { useState } from "react";

interface IProps {
  toggleSwitchHandle?: () => void;
  isChecked: boolean;
}

export const ToggleSwitch = ({ toggleSwitchHandle }: IProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    setIsChecked(!isChecked);
    toggleSwitchHandle();
  };
  return (
    <div className="toggle">
      <input
        checked={isChecked}
        className="toggle__input"
        type="checkbox"
        id="myToggle"
      />
      <div className="toggle__fill" onClick={handleClick}></div>
    </div>
  );
};
