import "./styles.scss";
import { IVariant } from "../../../../../interfaces/variant";
import { ITariff } from "../../../../../interfaces/tariffs";
import { ToggleSwitch } from "../../../../../components/toggle-switch/ToggleSwitch";

interface IProps {
  variants: IVariant[];
  currentTariff: ITariff;
  handleVariant: (id: IVariant) => void;
  currentVariant: IVariant["id"];
  handleTogleSwitch: (id: string) => void;
  isChecked: boolean;
}

export const TariffVariants = ({
  variants,
  currentTariff,
  handleVariant,
  currentVariant,
  handleTogleSwitch,
  isChecked,
}: IProps) => {
  return (
    <>

      {currentTariff?.type === "DAY"
        ? variants!
            .filter((variant) => variant.variant === "ONE_DAY")
            .map((item) => (
              <div key={item.id}>
                <span>Один день</span>
                <ToggleSwitch
                  onClick={() => {
                    handleTogleSwitch(item.id);
                  }}
                  isChecked={isChecked}
                />
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
