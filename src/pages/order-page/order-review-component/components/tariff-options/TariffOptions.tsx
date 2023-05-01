import { ITariff } from "../../../../../interfaces/tariffs";
import "./styles.scss";
import { AppTable } from "../../../../../components/app-table/AppTable";

interface IProps {
  duration: number;
  currentTariff: ITariff;
}

export const TariffOptions = ({ currentTariff, duration }: IProps) => {
  return (
    <div className='tariffs__container'>
      {currentTariff.type === "DAY" && (
        <AppTable
          title={"Суточный тариф"}
          value1={`${currentTariff.price} руб/сутки`}
          value2={`${duration * currentTariff.price} руб`}
        />
      )}
      {currentTariff.type === "MINUTE" && (
        <AppTable
          title={"Поминутный тариф"}
          value1={`${currentTariff.price} руб/мин`}
          value2={`от ${duration * currentTariff.price} руб`}
        />
      )}
    </div>
  );
};
