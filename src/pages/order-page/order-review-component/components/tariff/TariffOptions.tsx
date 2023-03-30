import { ITariff } from "../../../../../interfaces/tariffs";
import "./styles.scss";
import { OrderField } from "../OrderField";
interface IProps {
  currentTariff: ITariff;
}

export const TariffOptions = ({ currentTariff }: IProps) => {
  return (
    <div className="tariffs__container">
      {currentTariff.type === "DAY" && (
        <OrderField
          description="Суточный тариф"
          value={`${currentTariff.price} руб/сутки`}
        />
      )}
      {currentTariff.type === "MINUTE" && (
        <OrderField
          description="Поминутный тариф"
          value={`${currentTariff.price} руб/мин`}
        />
      )}
    </div>
  );
};
