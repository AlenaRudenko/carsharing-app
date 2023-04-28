import "./styles.scss";
import { AppIcon } from "../../../../../components/app-icon/AppIcon";
import { Api } from "../../../../../services/api.service";
import { ITariff } from "../../../../../interfaces/tariffs";
import { RootState } from "../../../../../store/store";
import { HelpModal } from "../../../../../components/help-modal/HelpModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
interface IProps {
  id: string;
  title: string;
  descrintion: string;
  tariffs: ITariffsOptions[];
  allTariffs: ITariff[];
  handleService: (id: string) => void;
  carEnsurance: boolean;
  lifeEnsurance: boolean;
  childChair: boolean;
}

interface ITariffsOptions {
  price: number;
  tariff: string;
}
export const Service = ({
  id,
  title,
  descrintion,
  tariffs,
  allTariffs,
  handleService,
  carEnsurance,
  lifeEnsurance,
  childChair,
}: IProps) => {
  const [fontSize, setFontSize] = useState("small");
  const handleSetIsVisible = () => {};
  useEffect(() => {
    document.documentElement.clientWidth < 992
      ? setFontSize("xx-small")
      : document.documentElement.clientWidth < 1200
      ? setFontSize("small")
      : setFontSize("11px");
  }, []);

  const currentTariffId = useSelector(
    (state: RootState) => state.order.tariffId
  );

  const currentTariff = allTariffs?.find(
    (tariff) => tariff.id === currentTariffId
  );

  return (
    <div
      onClick={() => handleService(title)}
      className={`service__container service__container${
        ((childChair && title === "Детское кресло") ||
          (carEnsurance && title === "КАСКО") ||
          (lifeEnsurance && title === "Страхование жизни и здоровья")) &&
        "--active"
      }`}
    >
      <div className="service__title">
        <p>{title}</p>
        <HelpModal
          key={descrintion}
          descrintion={descrintion}
          fontSize={fontSize}
        />
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
      {currentTariff && currentTariff.type === "DAY" && (
        <>
          {tariffs
            .filter((e) => e.tariff === "day")
            .map((value: ITariffsOptions) => (
              <span key={value.tariff}>{value.price}</span>
            ))}
          <span>руб/сутки</span>
        </>
      )}
      {currentTariff && currentTariff.type === "MINUTE" && (
        <>
          {tariffs
            .filter((e) => e.tariff === "min")
            .map((value: ITariffsOptions) => (
              <span key={value.tariff}>{value.price}</span>
            ))}
          {title === "Детское кресло" ? <span>руб</span> : <span>руб/мин</span>}
        </>
      )}
    </div>
  );
};
