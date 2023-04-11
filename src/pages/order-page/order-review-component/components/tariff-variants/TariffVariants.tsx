import "./styles.scss";
import { IVariant } from "../../../../../interfaces/variant";

interface IProps {
  variants: IVariant[];
  currentTariff: ITariff;
  variantId: string;
  handleVariant: (id: IVariant) => void;
  variant: IVariant;
  currentVariant: IVariant["id"];
}

export const TariffVariants = ({
  variants,
  currentTariff,
  variant,
  variantId,
  handleVariant,
  currentVariant,
}: IProps) => {
  return (
    {variants!.filter((variant) => variant.variant !== "ONE_DAY").map((item) => (
         <div key={item.id}
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
    ))}
 
  );
};
