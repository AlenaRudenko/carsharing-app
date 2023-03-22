import { DropdownMenu } from "../dropdown-menu-location/DropdownMenu";
import { LocalStore } from "../../services/localStorage.service";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, Dispatch } from "../../store/store";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

interface IProps {
  color?: string;
  size?: string;
  padding?: string;
  testCity?: string;
  handleLocalStoreCity?: (city: string) => void;
}
export const Header = ({
  color,
  size,
  padding,
  testCity,
  handleLocalStoreCity,
}: IProps) => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch<Dispatch>();
  const cityId = useSelector((state: RootState) => state.order.cityId);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const localCity = LocalStore.getCurrentCity();
  useEffect(() => {
    if (!testCity) {
      setCity(localCity!);
    } else {
      setCity("Саранск");
    }
  });
  const hangler = () => {};
  return (
    <div className="header" style={{ color, padding }}>
      <h1 onClick={goHome} style={{ fontSize: size }}>
        Need for Drive
      </h1>
      <DropdownMenu
        testCity={testCity ? testCity : localCity!}
        handleLocalStoreCity={
          handleLocalStoreCity ? handleLocalStoreCity : hangler
        }
      />
    </div>
  );
};
