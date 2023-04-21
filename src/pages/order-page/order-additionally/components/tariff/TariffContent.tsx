import "./styles.scss";

interface IProps {
  tariff: string;
  price: number;
  tariffParams: ITariffParams[];
  textParams: IText;
  duration: number;
}

interface IText {
  fontSize: string;
  marginBottom: string;
  priceSize: string;
}
interface ITariffParams {
  type: string;
  carWaiting: string;
  standbyMode: string;
  fuel: string;
  mileage: string;
  overMileage: string;
}

export const TariffContent = ({
  tariff,
  price,
  tariffParams,
  textParams,
  duration,
}: IProps) => {
  return (
    <div style={{ userSelect: "none" }}>
      <div
        className={`price price${
          duration >= 1440 && tariff === "MINUTE" && "--unactive"
        }`}
        style={{ fontSize: textParams.priceSize }}
      >
        <span>{tariff === "DAY" ? "Аренда" : "В пути"}</span>
        <span>
          {tariff === "DAY" ? `${price} руб/сут` : `${price} руб/мин`}
        </span>
      </div>
      {tariffParams
        .filter((value) => value.type === tariff)
        .map((tariff) => (
          <div key={tariff.type}>
            {tariff.carWaiting && (
              <div
                key={tariff.carWaiting}
                className="description"
                style={{
                  fontSize: textParams.fontSize,
                  marginBottom: textParams.marginBottom,
                }}
              >
                <span>Ожидание</span>
                <span>{tariff.carWaiting}</span>
              </div>
            )}
            {tariff.fuel && (
              <div
                key={tariff.fuel}
                className="description"
                style={{
                  fontSize: textParams.fontSize,
                  marginBottom: textParams.marginBottom,
                }}
              >
                <span>Топливо</span>
                <span>{tariff.fuel}</span>
              </div>
            )}
            {tariff.mileage && (
              <div
                key={tariff.mileage}
                className="description"
                style={{
                  fontSize: textParams.fontSize,
                  marginBottom: textParams.marginBottom,
                }}
              >
                <span>Пробег</span>
                <span>{tariff.mileage}</span>
              </div>
            )}
            {tariff.overMileage && (
              <div
                key={tariff.overMileage}
                className="description"
                style={{
                  fontSize: textParams.fontSize,
                  marginBottom: textParams.marginBottom,
                }}
              >
                <span>Сверх пробега</span>
                <span>{tariff.overMileage}</span>
              </div>
            )}
            {tariff.standbyMode && (
              <div
                key={tariff.standbyMode}
                className="description"
                style={{
                  fontSize: textParams.fontSize,
                  marginBottom: textParams.marginBottom,
                }}
              >
                <span>{tariff.standbyMode}</span>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
