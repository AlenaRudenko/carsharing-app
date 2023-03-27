import { useState } from "react";
import { AppButton } from "../../../../../components/app-button/AppButton";
import "./styles.scss";
import { TEvent } from "../../../../../interfaces/event";

interface IProps {
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
  addresses,
  handleSetCurrentAddress,
}: IProps) => {
  const [currentAddress, setCurrentInputAddress] = useState("");

  const addressCheck = addresses.find(
    (address) => address.name === currentAddress
  );
  const handleAddress = () => {
    if (addressCheck) {
      handleSetCurrentAddress(addressCheck!);
    }
  };
  const handleCurrentAddress = (e: TEvent) => {
    setCurrentInputAddress(e.target.value);
  };
  return (
    <div className='dropDownAddress__container'>
      <div className='orderLocation__input'>
        <input
          id='suggest'
          list='address'
          value={currentAddress}
          onChange={handleCurrentAddress}
        />
      </div>
      <datalist id='address'>
        {addresses.map((address) => {
          return (
            <option
              key={address.id}
              className='my-option'
              value={address.name}
              onClick={() => {
                setCurrentInputAddress(address.name);
                console.log("ЧЕЕЕЕЕЕЕЕЕЕЕЕЕЕ", address);
              }}
            />
          );
        })}
      </datalist>
      <div className='dropDown__button'>
        <AppButton text={"Выбрать"} onClick={handleAddress} />
      </div>
    </div>
  );
};
