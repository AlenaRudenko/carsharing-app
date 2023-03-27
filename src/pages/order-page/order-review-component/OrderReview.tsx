import { useNavigate } from "react-router";
import { AppButton } from "../../../components/app-button/AppButton";
import "./styles.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IProps {
  paths: string[];
  navPoint: string;
  handleStatusOrder: () => void;
}

interface IState {
  isDisabled: boolean;
}
export const OrderReview = ({ navPoint, paths }: IProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const carId = useSelector((state: RootState) => state.order.carId);
  const cityId = useSelector((state: RootState) => state.order.cityId);
  const addressId = useSelector((state: RootState) => state.order.addressId);
  const navigate = useNavigate();

  //
  useEffect(() => {
    if (navPoint === "order-location" && addressId) {
      setIsDisabled(false);
    } else if (navPoint === "order-model" && carId) {
      setIsDisabled(false);
    } else if (navPoint === "order-additionally" && addressId) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  });
  return (
    <div className='orderReview__container'>
      <span>Ваш заказ:</span>
      <div className='orderReview__content'>
        <span>sss</span>
      </div>
      <AppButton
        isDisabled={isDisabled}
        text='Продолжить'
        onClick={() => {
          navigate(navPoint);
        }}
      />
    </div>
  );
};
