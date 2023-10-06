import "./../styles.scss";
interface IProps {
  handleCurrentVariant: (variant: string) => void;
  variant: string;
  currentVariantId: string;
  variantColor: string;
  imageUrl: string;
}

export const Colors = ({
  handleCurrentVariant,
  variant,
  variantColor,
  currentVariantId,
  imageUrl,
}: IProps) => {
  return (
    <div
      onClick={() => {
        handleCurrentVariant(variant);
      }}
      className={`currentCar__reviewColors ${
        currentVariantId === variant ? "currentCar__reviewColors--selected" : ""
      }`}
    >
      <img alt="" src={`https://api.need-for-drive.ru/${imageUrl}`} />
    </div>
  );
};
