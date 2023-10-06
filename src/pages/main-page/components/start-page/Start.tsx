import { useSelector } from "react-redux";
import { AppButton } from "../../../../components/app-button/AppButton";
import { Header } from "../../../../components/header/Header";
import { ICity } from "../../../../interfaces/city";
import { CarContent } from "../car-content/CarContent";
import "./styles.scss";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { TPath } from "../../MainContent";

interface IProps {
  localCity: string;
  handleLocalStoreCity: (city: string | undefined) => void;
  handleAuthIndex: (value: number | null) => void;
  confirmedOrderPaths: TPath[];
}

export const Start = ({
  localCity,
  handleLocalStoreCity,
  handleAuthIndex,
  confirmedOrderPaths,
}: IProps) => {
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const handleClick = () => {
    if (user && confirmedOrderPaths && confirmedOrderPaths.length) {
      let currentPath = confirmedOrderPaths?.find(
        (item) => item.index === confirmedOrderPaths.length,
      );
      console.log("ЧЕ ПРОИАХОДИТ", confirmedOrderPaths);
      navigate("/order/" + currentPath!.name);
    } else {
      if (user && confirmedOrderPaths.length === 0) {
        navigate("/order/order-location");
      } else {
        handleAuthIndex(111);
        console.log(111);
      }
    }
  };
  return (
    <>
      <div className="startpage-container">
        <Header
          localCity={localCity}
          handleLocalStoreCity={handleLocalStoreCity}
        />
        <div className="startpage-container__content">
          <span>Каршеринг</span>
          <span>Need for Drive</span>
          <span>Поминутная аренда авто</span>

          <AppButton onClick={handleClick} text="Забронировать" size="large" />
        </div>

        <div className="startpage-container__footer">
          <span>© 2023 «Need for Drive»</span>
          <span>8 (495) 234-22-44</span>
        </div>
      </div>
      <CarContent />
    </>
  );
};
