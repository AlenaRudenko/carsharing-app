import "./../styles.scss";
interface IProps {
  handleCurrentVariant: (variant: string) => void;
  variant: string;
  currentColor: string;
  variantColor: string;
}

export const Colors = ({
  handleCurrentVariant,
  variant,
  variantColor,
  currentColor,
}: IProps) => {
  return (
    <div
      onClick={() => {
        handleCurrentVariant(variant);
      }}
      className={`currentCar__reviewColors ${
        currentColor === variant ? "currentCar__reviewColors--selected" : ""
      }`}
      style={{ backgroundColor: `#${variantColor}` }}
    ></div>
  );
};
