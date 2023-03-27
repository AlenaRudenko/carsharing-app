import { ChangeEvent, useState } from "react";
import { YandexMap } from "../../../YandexMap/YandexMap";
import "./styles.scss";
import { DropdownMenuAddress } from "./components/dropdown-menu/DropdownMenuAddress";
import { ICoords } from "../../../interfaces/coords";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../store/store";

interface IProps {
  addresses: IAddress[];
  localCity: string;
  coordsLocation: ICoords;
  handleSetCurrentAddress: (address: IAddress) => void;
}

interface IState {
  value: string;
  currentAddress: IAddress;
}

interface IAddress {
  name: string;
  id: string;
}
export const OrderLocation = ({
  handleSetCurrentAddress,
  localCity,
  coordsLocation,
  addresses,
}: IProps) => {
  const [value, setValue] = useState<IState["value"]>("");

  const dispatch = useDispatch<Dispatch>();

  //обработчик ввода адреса
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="orderLocation__container">
        <DropdownMenuAddress
          handleSetCurrentAddress={handleSetCurrentAddress}
          addresses={addresses}
        />

        <div id="map" className="orderLocation__map">
          <YandexMap coordsLocation={coordsLocation} />
        </div>
      </div>
    </>
  );
};
