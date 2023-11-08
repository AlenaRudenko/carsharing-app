import "./styles.scss";
import { YandexMap } from "../../../YandexMap/YandexMap";
import { DropdownMenuAddress } from "./components/dropdown-menu/DropdownMenuAddress";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../store/store";
import { IAddress } from "../data/orderAddresses";

export const OrderLocation = () => {

  const dispatch = useDispatch<Dispatch>();
  
  const handleSetCurrentAddress = (address: IAddress) => {
    dispatch.order.setAddressId(address.id);
  };

  return (
    <div className="orderLocation-container">
      <DropdownMenuAddress {...{ handleSetCurrentAddress }} />
      <div id="map" className="orderLocation-container__map">
        <YandexMap />
      </div>
    </div>
  );
};
