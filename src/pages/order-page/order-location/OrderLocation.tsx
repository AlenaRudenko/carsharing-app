import { ChangeEvent, useState } from "react";
import { YandexMap } from "../../../YandexMap/YandexMap";
import "./styles.scss";
import { DropdownMenu } from "./components/DropdownMenu";

export const OrderLocation = () => {
  const [value, setValue] = useState("");
  const addresses = ["ул. Гагарина 88", "ул. Васенко 15", "ул. Ленина 55"];
  const [currentAddress, setCurrentAddress] = useState("");

  const handleSetCurrentAddress = (address: string) => {
    setCurrentAddress(address);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className='orderLocation__container'>
        <div className='orderLocation__input'>
          <input
            id='suggest'
            list='address'
            onChange={handleInputChange}
            value={value}
          />
        </div>

        <DropdownMenu
          setCurrentAdress={handleSetCurrentAddress}
          addresses={addresses}
        />

        <div id='map' className='orderLocation__map'>
          <YandexMap />
        </div>
      </div>
    </>
  );
};
