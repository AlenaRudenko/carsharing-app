import { useNavigate } from "react-router";
import { AppButton } from "../../../components/app-button/AppButton";
import "./styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IProps {
  navPoint: string;
}

export const OrderReview = ({ navPoint }: IProps) => {
  const navigate = useNavigate();
  const carId = useSelector((state: RootState) => state.order.carId);
  const cityId = useSelector((state: RootState) => state.order.cityId);
  return (
    <div className="orderReview__container">
      <span>Ваш заказ:</span>
      <div className="orderReview__content">
        <span>sss</span>
      </div>
      <AppButton
        isDisabled={true}
        text="Продолжить"
        onClick={() => {
          navigate(navPoint);
        }}
      />
    </div>
  );
};
