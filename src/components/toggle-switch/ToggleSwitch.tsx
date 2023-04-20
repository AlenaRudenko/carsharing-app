import "./styles.scss";

interface IProps {
  onClick?: () => void;
  isChecked: boolean;
}

export const ToggleSwitch = ({ onClick, isChecked }: IProps) => {
  return (
    <div className="toggle">
      <input
        checked={isChecked}
        className="toggle__input"
        type="checkbox"
        id="myToggle"
      />
      <div className="toggle__fill" onClick={onClick}></div>
    </div>
  );
};
