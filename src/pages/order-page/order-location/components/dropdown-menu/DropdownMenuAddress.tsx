import "./styles.scss";

interface IProps {
  addresses: string[];
  setCurrentAdress: (address: string) => void;
}

export const DropdownMenuAddress = ({ addresses, setCurrentAdress }: IProps) => {
  const handleAddress = (address: string) => {
    setCurrentAdress(address);
  };

  return (
    <datalist id="address">
      {addresses.map((address) => {
        return (
          <option
            key={address}
            className="my-option"
            value={address}
            onClick={() => {
              handleAddress(address);
            }}
          />
        );
      })}
    </datalist>
  );
};
