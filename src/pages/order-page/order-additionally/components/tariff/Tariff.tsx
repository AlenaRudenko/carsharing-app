import "./styles.scss";

interface IProps {
  id: string;
  type: string;
  price: number;
  currentTariffId: string;
  handleTariff: (id: string) => void;
}

export const Tariff = ({
  price,
  type,
  id,
  handleTariff,
  currentTariffId,
}: IProps) => {
  const handleOnClick = () => {
    handleTariff(id);
  };
  return (
    <div
      className={`tariff__container tariff__container${
        currentTariffId === id && "--active"
      }`}
      onClick={handleOnClick}
    >
      <div className="tariff__container__price">
        {type === "MINUTE" && (
          <>
            <h1>Поминутный</h1>
            <div className="price">
              <span>В пути</span>
              <span>{`${price} руб/мин`}</span>
            </div>
            <div className="description">
              <span>Ожидание</span>
              <span>{`${price / 4} руб/мин`}</span>
            </div>
            <div className="description">
              <span>10 минут бесплатного ожидания</span>
            </div>
          </>
        )}
        {type === "DAY" && (
          <>
            <h1>Суточный</h1>
            <div className="price">
              <span>Аренда</span>
              <span>{`${price} руб/сут`}</span>
            </div>
            <div className="description">
              <span>Топливо</span>
              <span>не включено</span>
            </div>
            <div className="description">
              <span>Пробег</span>
              <span>70 км бесплатно</span>
            </div>
            <div className="description">
              <span>Сверх лимита по пробегу</span>
              <span>10 руб/км</span>
            </div>
            <div className="description">
              <span>10 минут бесплатного ожидания</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
