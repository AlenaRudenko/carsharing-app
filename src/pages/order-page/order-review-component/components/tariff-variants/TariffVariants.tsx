import "./styles.scss";
import { IVariant } from "../../../../../interfaces/variant";
import { ITariff } from "../../../../../interfaces/tariffs";
import { ToggleSwitch } from "../../../../../components/toggle-switch/ToggleSwitch";

interface IProps {
  variants: IVariant[];
  currentTariff: ITariff;
  handleVariant: (id: string) => void;
  currentVariant: IVariant["id"];
}

export const TariffVariants = ({
  variants,
  currentTariff,
  handleVariant,
  currentVariant,
}: IProps) => {
  return (
    <div className="tariff__containerMedia">
      {currentTariff?.type === "DAY"
        ? variants!
            .filter((variant) => variant.variant === "ONE_DAY")
            .map((item) => (
              <div className="tariffVariant" key={item.id}>
                <span>Один день</span>
                <ToggleSwitch
                  key={item.variant}
                  isChecked={currentVariant === item.id}
                  toggleSwitch={() => {
                    handleVariant(item.id);
                  }}
                />
              </div>
            ))
        : variants!
            .filter((variant) => variant.variant !== "ONE_DAY")
            .map((item) => (
              <div className="tariffVariant" key={item.variant}>
                <span>
                  {item.variant.includes("ONE_H") ? "Один час" : "Три часа"}
                </span>
                <ToggleSwitch
                  isChecked={currentVariant === item.id}
                  key={item.variant}
                  toggleSwitch={() => {
                    handleVariant(item.id);
                  }}
                />
              </div>
            ))}
    </div>
  );
};
