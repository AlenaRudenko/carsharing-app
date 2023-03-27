import { ChangeEvent, useState } from "react";
import { YandexMap } from "../../../YandexMap/YandexMap";
import "./styles.scss";
import { DropdownMenuAddress } from "./components/dropdown-menu/DropdownMenuAddress";
import { ICoords } from "../../../interfaces/coords";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../store/store";

interface IProps {
  localCity: string;
  coordsLocation: ICoords;
}

interface IState {
  value: string;
  currentAddress: IAddress;
}

interface IAddress {
  name: string;
  id: string;
}
export const OrderLocation = ({ localCity, coordsLocation }: IProps) => {
  const [value, setValue] = useState<IState["value"]>("");
  const addresses = [
    { name: "ул. Гагарина 88", id: "1" },
    { name: "ул. Васенко 15", id: "2" },
    { name: "ул. Ленина 55", id: "3" },
  ];

  const dispatch = useDispatch<Dispatch>();

  // сет в стейт и в редакс адрес
  const handleSetCurrentAddress = (address: IAddress) => {
    dispatch.order.setAddressId(address.id);
  };
  //обработчик ввода адреса
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className='orderLocation__container'>
        <DropdownMenuAddress
          handleSetCurrentAddress={handleSetCurrentAddress}
          addresses={addresses}
        />

        <div id='map' className='orderLocation__map'>
          <YandexMap coordsLocation={coordsLocation} />
        </div>
      </div>
    </>
  );
};
