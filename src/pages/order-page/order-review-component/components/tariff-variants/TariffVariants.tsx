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
              <div className="tariffVariant" key={item.id}>
                <span>Один день</span>
                <ToggleSwitch
                  toggleSwitchHandle={() => {
                    handleTogleSwitch(item.id);
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
                  key={item.variant}
                  toggleSwitchHandle={() => {
                    handleTogleSwitch(item.id);
                  }}
                />
              </div>
            ))}
    </>
  );
};
