import "./styles.scss";
import { AppIcon } from "../../../../../../components/app-icon/AppIcon";
import { Api } from "../../../../../../services/api.service";
import { ITariff } from "../../../../../../interfaces/tariffs";
import { RootState } from "../../../../../../store/store";
import { HelpModal } from "../../../../../../components/help-modal/HelpModal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IService } from "../../../../data/orderData";

interface IProps {
  carEnsurance: boolean;
  lifeEnsurance: boolean;
  childChair: boolean;
  handleService: (id: string) => void;
  service: IService;
  currentTariff?: ITariff;
}

interface ITariffsOptions {
  price: number;
  tariff: string;
}

export const ServiceItem = ({
  service,
  handleService,
  carEnsurance,
  lifeEnsurance,
  childChair,
  currentTariff,
}: IProps) => {
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
      onClick={() => handleService(service.id)}
      className={`service__container service__container${
        ((childChair && service.title === "Детское кресло") ||
          (carEnsurance && service.title === "КАСКО") ||
          (lifeEnsurance &&
            service.title === "Страхование жизни и здоровья")) &&
        "--active"
      }`}
    >
      <div className="service__title">
        <p>{service.title}</p>
        <HelpModal
          key={service.descrintion}
          descrintion={service.descrintion}
          fontSize={fontSize}
        />
      </div>

      <AppIcon
        icon={
          service.title === "Детское кресло"
            ? "Smile"
            : service.title === "КАСКО"
            ? "Tool"
            : "Heart"
        }
      />
      {currentTariff && currentTariff.type === "DAY" && (
        <>
          {service.tariffs
            .filter((e) => e.tariff === "day")
            .map((value: ITariffsOptions) => (
              <span key={value.tariff}>{value.price}</span>
            ))}
          <span>руб/сутки</span>
        </>
      )}
      {currentTariff && currentTariff.type === "MINUTE" && (
        <>
          {service.tariffs
            .filter((e) => e.tariff === "min")
            .map((value: ITariffsOptions) => (
              <span key={value.tariff}>{value.price}</span>
            ))}
          {service.title === "Детское кресло" ? (
            <span>руб</span>
          ) : (
            <span>руб/мин</span>
          )}
        </>
      )}
    </div>
  );
};
