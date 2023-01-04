import { ICity } from "../interfaces/city";
import { DropdownMenu } from "./dropdown-menu/DropdownMenu";
import "./styles.scss";
interface IProps {
  color?: string;
  cities: ICity[];
}
export const Header = ({ color, cities }: IProps) => {
  return (
    <div className='header' style={{ color: color }}>
      <h1>Need for Drive</h1>
      <DropdownMenu />
    </div>
  );
};
