import "./styles.scss";

interface IProps {
  tariff: string;
  price: number;
  tariffParams: ITariffParams[];
  textParams: IText;
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
}: IProps) => {
  return (
    <div>
      <div className='price' style={{ fontSize: textParams.priceSize }}>
        <span>{tariff === "DAY" ? "Аренда" : "В пути"}</span>
        <span>
          {tariff === "DAY" ? `${price} руб/сут` : `${price} руб/мин`}
        </span>
      </div>
      {tariffParams
        .filter((value) => value.type === tariff)
        .map((tariff) => (
          <>
            {tariff.carWaiting && (
              <div
                className='description'
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
                className='description'
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
                className='description'
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
                className='description'
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
                className='description'
                style={{
                  fontSize: textParams.fontSize,
                  marginBottom: textParams.marginBottom,
                }}
              >
                <span>{tariff.standbyMode}</span>
              </div>
            )}
          </>
        ))}
    </div>
  );
};
