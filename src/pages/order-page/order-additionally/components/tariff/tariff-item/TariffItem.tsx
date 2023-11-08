import { ITariff } from "../../../../../../interfaces/tariffs";
import { IText } from "../Tariff";
import { TariffContent } from "./tariff-content/TariffContent";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, RootState } from "../../../../../../store/store";
import "./styles.scss";

interface IProps {
  tariff: ITariff;
  textParams: IText;
}

export const TariffItem = ({ tariff, textParams }: IProps) => {
  const currentTariffId = useSelector(
    (state: RootState) => state.order.tariffId,
  );
  const dispatch = useDispatch<Dispatch>();
  const handleTariff = (tariffId: ITariff["id"]) => {
    currentTariffId !== tariffId && dispatch.order.setTariffId(tariffId);
  };

  return (
    <div
      key={tariff.id}
      className={`tariff-container__content tariff-container__content${
        currentTariffId === tariff.id && "--active"
      } `}
      onClick={() => handleTariff(tariff.id)}
    >
      <h1
        style={{
          fontSize: textParams.headlingSize,
          marginBottom: "10px",
        }}
      >
        {tariff.type === "DAY" ? "Суточный" : "Поминутный"}
      </h1>
      <div className="tariff-container__price">
        <TariffContent
          textParams={textParams}
          price={tariff.price}
          tariff={tariff.type}
        />
      </div>
    </div>
  );
};
