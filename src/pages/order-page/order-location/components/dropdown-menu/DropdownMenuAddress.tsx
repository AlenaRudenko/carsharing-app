import { useState } from "react";
import { AppButton } from "../../../../../components/app-button/AppButton";
import "./styles.scss";
import { TEvent } from "../../../../../interfaces/event";
import { addresses, IAddress } from "../../../data/orderAddresses";

interface IProps {
  handleSetCurrentAddress: (address: IAddress) => void;
}

interface IState {
  address: string;
}

export const DropdownMenuAddress = ({ handleSetCurrentAddress }: IProps) => {
  const [address, setAddress] = useState<IState["address"]>("");

  const currentAddress = addresses.find((ad) => ad.name === address);

  const handleAddress = () => {
    if (currentAddress) {
      handleSetCurrentAddress(currentAddress!);
    }
  };

  const handleChange = (e: TEvent) => {
    setAddress(e.target.value);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-container__input">
        <input
          id="suggest"
          list="address"
          value={address}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      <datalist id="address">
        {addresses.map((address) => {
          return (
            <option
              key={address.id}
              className="my-option"
              value={address.name}
            />
          );
        })}
      </datalist>
      <div className="dropdown-container__button">
        <AppButton text={"Выбрать"} onClick={handleAddress} />
      </div>
    </div>
  );
};
