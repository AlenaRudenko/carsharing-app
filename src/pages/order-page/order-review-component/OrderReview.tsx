import { useNavigate } from "react-router";
import { AppButton } from "../../../components/app-button/AppButton";
import "./styles.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IProps {
  navPoint: string;
  handleStatusOrder: () => void;
}

interface IState {
  isDisabled: boolean;
}
export const OrderReview = ({ navPoint }: IProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const carId = useSelector((state: RootState) => state.order.carId);
  const cityId = useSelector((state: RootState) => state.order.cityId);

  const navigate = useNavigate();

  //
  useEffect(() => {
    if (navPoint === "location" && cityId) {
      setIsDisabled(false);
    } else if (navPoint === "car" && carId) {
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
