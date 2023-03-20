import { DropdownMenu } from "./dropdown-menu-location/DropdownMenu";
import { LocalStore } from "../services/localStorage.service";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import "./styles.scss";
interface IProps {
  color?: string;
  size?: string;
  padding?: string;
  testCity?: string;
  handleLocalStoreCity?: (city: string | undefined) => void;
}
export const Header = ({
  color,
  size,
  padding,
  testCity,
  handleLocalStoreCity,
}: IProps) => {
  return (
    <div className="header" style={{ color, padding }}>
      <h1 style={{ fontSize: size }}>Need for Drive</h1>
      <DropdownMenu
        testCity={testCity}
        handleLocalStoreCity={handleLocalStoreCity}
      />
    </div>
  );
};
