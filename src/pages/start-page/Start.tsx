import { useSelector } from "react-redux";
import { AppButton } from "../../components/app-button/AppButton";
import { Header } from "../../components/Header";
import { ICity } from "../../interfaces/city";
import { CarContent } from "../main-page/CarContent";
import "./styles.scss";
import { RootState } from "../../store/store";
import { NavLink, useNavigate } from "react-router-dom";

interface IProps {
  cities: ICity[];
  toggleAuthVisible: () => void;
}

export const Start = ({ cities, toggleAuthVisible }: IProps) => {
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  return (
    <>
      <div className='mainpage--container'>
        <Header />
        <div className='mainpage--content'>
          <span>Каршеринг</span>
          <span>Need for Drive</span>
          <span>Поминутная аренда авто</span>

          <AppButton
            onClick={
              user ? () => navigate("/order/order-location") : toggleAuthVisible
            }
            text='Забронировать'
            size='large'
          />
        </div>

        <div className='mainpage--footer'>
          <span>© 2022 «Need for Drive»</span>
          <span>8 (495) 234-22-44</span>
        </div>
      </div>
      <CarContent />
    </>
  );
};