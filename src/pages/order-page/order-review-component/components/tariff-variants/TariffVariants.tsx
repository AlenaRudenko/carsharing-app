import "./styles.scss";
import { IVariant } from "../../../../../interfaces/variant";
import { ITariff } from "../../../../../interfaces/tariffs";

interface IProps {
  variants: IVariant[];
  currentTariff: ITariff;
  handleVariant: (id: IVariant) => void;
  currentVariant: IVariant["id"];
}

export const TariffVariants = ({
  variants,
  currentTariff,
  handleVariant,
  currentVariant,
}: IProps) => {
  return (
    <>
      {currentTariff?.type === "DAY"
        ? variants!
            .filter((variant) => variant.variant === "ONE_DAY")
            .map((item) => (
              <div
                key={item.id}
                className={`tariffVariant__container tariffVariant__container${
                  currentVariant === item.id ? "--active" : ""
                }`}
                onClick={() => handleVariant(item)}
              >
                Один день
              </div>
            ))
        : variants!
            .filter((variant) => variant.variant !== "ONE_DAY")
            .map((item) => (
              <div
                key={item.id}
                className={`tariffVariant__container tariffVariant__container${
                  currentVariant === item.id ? "--active" : ""
                }`}
                onClick={() => handleVariant(item)}
              >
                {item.variant.includes("ONE_H") ? "Один час" : "Три часа"}
              </div>
            ))}
    </>
  );
};
