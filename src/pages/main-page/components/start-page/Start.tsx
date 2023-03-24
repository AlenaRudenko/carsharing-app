import { useSelector } from "react-redux";
import { AppButton } from "../../../../components/app-button/AppButton";
import { Header } from "../../../../components/header/Header";
import { ICity } from "../../../../interfaces/city";
import { CarContent } from "../car-content/CarContent";
import "./styles.scss";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";

interface IProps {
  toggleAuthVisible: () => void;
  localCity: string;
  handleLocalStoreCity: (city: string | undefined) => void;
}

export const Start = ({
  toggleAuthVisible,
  localCity,
  handleLocalStoreCity,
}: IProps) => {
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  return (
    <>
      <div className='mainpage--container'>
        <Header
          localCity={localCity}
          handleLocalStoreCity={handleLocalStoreCity}
        />
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
          <span>© 2023 «Need for Drive»</span>
          <span>8 (495) 234-22-44</span>
        </div>
      </div>
      <CarContent />
    </>
  );
};
