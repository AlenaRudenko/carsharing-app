import "../styles.scss";
import { IVariant } from "../../../../../../interfaces/variant";

interface IProps {
  item: IVariant;
}

export const VariantSwitcher = ({ item }: IProps) => {
  return (
    <div className="tariffVariant" key={item.variant}>
      <span>{item.variant.includes("ONE_H") ? "Один час" : "Три часа"}</span>
      <ToggleSwitch
        key={item.variant}
        toggleSwitchHandle={() => {
          handleTogleSwitch(item.id);
        }}
      />
    </div>
  );
};
