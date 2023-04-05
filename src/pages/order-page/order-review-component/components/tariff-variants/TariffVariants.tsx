import "./styles.scss";
import { IVariant } from "../../../../../interfaces/variant";

interface IProps {
  variantId: string;
  handleVariant: (id: IVariant) => void;
  variant: IVariant;
  currentVariant: IVariant["id"];
}

export const TariffVariants = ({
  variant,
  variantId,
  handleVariant,
  currentVariant,
}: IProps) => {
  return (
    <div
      className={`tariffVariant__container tariffVariant__container${
        currentVariant === variantId ? "--active" : ""
      }`}
      onClick={() => handleVariant(variant)}
    >
      {variant.variant.includes("DAY")
        ? "Один день"
        : variant.variant.includes("ONE_H")
        ? "Один час"
        : "Три часа"}
    </div>
  );
};
