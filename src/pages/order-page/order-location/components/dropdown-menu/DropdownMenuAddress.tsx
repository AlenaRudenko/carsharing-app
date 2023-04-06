import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Api } from "../../../../../services/api.service";
import { LocalStore } from "../../../../../services/localStorage.service";
import { AppButton } from "../../../../../components/app-button/AppButton";
import "./styles.scss";
import { TEvent } from "../../../../../interfaces/event";
import { ICity } from "../../../../../interfaces/city";
import { Dispatch } from "../../../../../store/store";

interface IProps {
  cities: ICity[];
  addresses: IAddress[];
  handleSetCurrentAddress: (address: IAddress) => void;
}

interface IAddress {
  name: string;
  id: string;
}

interface IState {
  address: IAddress;
}
export const DropdownMenuAddress = ({
  cities,
  addresses,
  handleSetCurrentAddress,
}: IProps) => {
  const [currentAddress, setCurrentInputAddress] = useState("");
  const [local, setLocal] = useState("");

  const addressCheck = addresses.find(
    (address) => address.name === currentAddress
  );
  const dispatch = useDispatch<Dispatch>();
  const currCity = cities.find((city) => city.name === local);
  const handleAddress = () => {
    if (addressCheck) {
      handleSetCurrentAddress(addressCheck!);
      dispatch.order.setCityId(currCity!.id);
    }
  };
  const handleCurrentAddress = (e: TEvent) => {
    setCurrentInputAddress(e.target.value);
  };
  useEffect(() => {
    const localCity = LocalStore.getCurrentCity();
    if (localCity) {
      setLocal(localCity);
    }
  });
  return (
    <div className="dropDownAddress__container">
      <div className="orderLocation__input">
        <input
          id="suggest"
          list="address"
          value={currentAddress}
          onChange={handleCurrentAddress}
        />
      </div>
      <datalist id="address">
        {addresses.map((address) => {
          return (
            <option
              key={address.id}
              className="my-option"
              value={address.name}
              onClick={() => {
                setCurrentInputAddress(address.name);
                console.log("ЧЕЕЕЕЕЕЕЕЕЕЕЕЕЕ", address);
              }}
            />
          );
        })}
      </datalist>
      <div className="dropDown__button">
        <AppButton text={"Выбрать"} onClick={handleAddress} />
      </div>
    </div>
  );
};
