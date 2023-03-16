import { DropdownMenu } from "./dropdown-menu-location/DropdownMenu";
import "./styles.scss";
interface IProps {
  color?: string;
  size?: string;
  padding?: string;
}
export const Header = ({ color, size, padding }: IProps) => {
  return (
    <div className='header' style={{ color, padding }}>
      <h1 style={{ fontSize: size }}>Need for Drive</h1>
      <DropdownMenu />
    </div>
  );
};
