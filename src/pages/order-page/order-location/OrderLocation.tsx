import "./styles.scss";
import { YandexMap } from "../../../YandexMap/YandexMap";
import { DropdownMenuAddress } from "./components/dropdown-menu/DropdownMenuAddress";

interface IProps {
  addresses: IAddress[];
  handleSetCurrentAddress: (address: IAddress) => void;
}

interface IAddress {
  name: string;
  id: string;
}

export const OrderLocation = ({
  handleSetCurrentAddress,
  addresses,
}: IProps) => {
  return (
    <div className='orderLocation-container'>
      <DropdownMenuAddress {...{ handleSetCurrentAddress, addresses }} />
      <div id='map' className='orderLocation-container__map'>
        <YandexMap />
      </div>
    </div>
  );
};
