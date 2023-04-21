import "./styles.scss";
import { AppIcon } from "../app-icon/AppIcon";

interface IProps {
  descrintion: string;
  fontSize?: string;
  isVisible?: boolean;
  setIsVisible: (value: boolean) => void;
}

export const HelpModal = ({
  descrintion,
  fontSize,
  isVisible,
  setIsVisible,
}: IProps) => {
  return (
    <>
      <div
        className={`service__help service__help${isVisible && "--active"}`}
        style={{ fontSize: fontSize }}
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
