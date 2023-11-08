import "./styles.scss";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../../../../store/store";

interface IProps {
  handleCurrentVariant: (variantId: string) => void;
  variant: string;
  currentVariantId: string;
  variantColor: string;
  imageUrl: string;
}

export const Color = ({
  variant,
  variantColor,
  currentVariantId,
  imageUrl,
  handleCurrentVariant,
}: IProps) => {
  return (
    <div
      onClick={() => {
        handleCurrentVariant(variant);
      }}
      className={`color-container color-container${
        currentVariantId === variant && "--selected"
      }`}
    >
      <img alt="" src={`https://api.need-for-drive.ru/${imageUrl}`} />
    </div>
  );
};
