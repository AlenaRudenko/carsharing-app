import { DropdownMenu } from "../dropdown-menu-location/DropdownMenu";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { RootState, Dispatch } from "../../store/store";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

interface IProps {
  color?: string;
  size?: string;
  padding?: string;
  localCity: string;
  handleLocalStoreCity?: (city: string) => void;
}

export const Header = ({
  color,
  size,
  padding,
  localCity,
  handleLocalStoreCity,
}: IProps) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className='header' style={{ color, padding }}>
      <h1 onClick={goHome} style={{ fontSize: size }}>
        Need for Drive
      </h1>
      <DropdownMenu
        localCity={localCity}
        handleLocalStoreCity={handleLocalStoreCity!}
      />
    </div>
  );
};
