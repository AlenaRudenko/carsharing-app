import "./styles.scss";
import { AppIcon } from "../../../../../components/app-icon/AppIcon";
import { useState, useEffect } from "react";
interface IProps {
  id: string;
  title: string;
  descrintion: string;
  price: number;
  tariff: string;
  handleService: (id: string) => void;
  currentServices: string[];
}

export const Service = ({
  id,
  title,
  descrintion,
  price,
  tariff,
  handleService,
  currentServices,
}: IProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fontSize, setFontSize] = useState("small");
  useEffect(() => {
    document.documentElement.clientWidth < 992
      ? setFontSize("xx-small")
      : document.documentElement.clientWidth < 1200
      ? setFontSize("small")
      : setFontSize("11px");
  }, []);
  return (
    <div
      onClick={() => handleService(title)}
      className={`service__container service__container${
        currentServices.includes(title) && "--active"
      }`}
    >
      <div className='service__title'>
        <div
          className={`service__help service__help${isVisible && "--active"}`}
          style={{ fontSize: fontSize }}
        >
          <span>{descrintion}</span>
        </div>
        <p>{title}</p>
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
      </div>

      <AppIcon
        icon={
          title === "Детское кресло"
            ? "Smile"
            : title === "КАСКО"
            ? "Tool"
            : "Heart"
        }
      />
      <span>{price}</span>
      {tariff === "min" ? <span>руб/мин</span> : <span>руб</span>}
    </div>
  );
};
