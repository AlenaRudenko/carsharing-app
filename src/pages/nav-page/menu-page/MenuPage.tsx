import "./../styles.scss";

interface IProps {
  idNumber: number;
  menu: IMenu[];
  handleOnClickMenuItem: (id: number) => void;
}

interface IMenu {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
}

export const MenuPage = ({ menu, handleOnClickMenuItem, idNumber }: IProps) => {
  return (
    <>
      <ul>
        {menu.map((item) => (
          <div key={item.id} onClick={() => handleOnClickMenuItem(item.id)}>
            <li
              className={`li li${
                idNumber === item.id ? "--active" : "unactive"
              }`}
            >
              {item.title}
            </li>
          </div>
        ))}
      </ul>
    </>
  );
};
