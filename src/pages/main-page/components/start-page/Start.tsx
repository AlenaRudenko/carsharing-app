import { useSelector } from "react-redux";
import { AppButton } from "../../../../components/app-button/AppButton";
import { Header } from "../../../../components/header/Header";
import { ICity } from "../../../../interfaces/city";
import { CarContent } from "../car-content/CarContent";
import "./styles.scss";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { TPath } from "../../MainContent";
import { useEffect, useState } from "react";
import { TEvent } from "../../../../interfaces/event";

interface IProps {
  localCity: string;
  handleCity: (city: string | undefined) => void;
  handleAuthIndex: (value: number | null) => void;
  confirmedOrderPaths: TPath[];
}
interface IState {
  matches: boolean | null;
}

export const Start = ({
  localCity,
  handleCity,
  handleAuthIndex,
  confirmedOrderPaths,
}: IProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [matches, setMatches] = useState<IState["matches"]>(null);
  useEffect(() => {
    setMatches((prevState) => window.matchMedia("(max-width:1200px").matches);
  }, []);
  useEffect(() => {
    const handler = (e: any) => setMatches(e.matches);
    window.matchMedia("(max-width:1200px)").addEventListener("change", handler);
    return () => {
      window
        .matchMedia("(max-width:1200px)")
        .removeEventListener("change", handler);
    };
  });
  const navigate = useNavigate();
  const handleClick = () => {
    if (user && confirmedOrderPaths && confirmedOrderPaths.length) {
      let currentPath = confirmedOrderPaths?.find(
        (item) => item.index === confirmedOrderPaths.length
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
      <div className='startpage-container'>
        <Header localCity={localCity} handleLocalStoreCity={handleCity} />
        <div className='startpage-container__content'>
          <span>Каршеринг</span>
          <span>Need for Drive</span>
          <span>Поминутная аренда авто</span>

          <AppButton onClick={handleClick} text='Забронировать' size='large' />
        </div>

        <div className='startpage-container__footer'>
          <span>© 2023 «Need for Drive»</span>
          <span>8 (495) 234-22-44</span>
        </div>
      </div>
      {!matches && <CarContent />}
    </>
  );
};
