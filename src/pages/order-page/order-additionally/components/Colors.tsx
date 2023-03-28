import "./../styles.scss";
interface IProps {
  handleCurrentVariant: (variant: string) => void;
  variant: string;
  currentVariantId: string;
  variantColor: string;
}

export const Colors = ({
  handleCurrentVariant,
  variant,
  variantColor,
  currentVariantId,
}: IProps) => {
  return (
    <div
      onClick={() => {
        handleCurrentVariant(variant);
      }}
      className={`currentCar__reviewColors ${
        currentVariantId === variant ? "currentCar__reviewColors--selected" : ""
      }`}
      style={{ backgroundColor: `#${variantColor}` }}
    ></div>
  );
};
