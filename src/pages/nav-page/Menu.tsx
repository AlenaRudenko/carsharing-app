import { Description } from "./components/description/Description";
import { useState, useEffect } from "react";
import "./styles.scss";
import { MenuPage } from "./menu-page/MenuPage";
import { ProfilePage } from "./profile-page/ProfilePage";

interface IProps {
  isOpenMenu: boolean;
  isOpenProfile: boolean;
  handleUserLogOut: () => void;
}

interface IState {
  id: number;
}

export const Menu = ({
  isOpenMenu,
  isOpenProfile,
  handleUserLogOut,
}: IProps) => {
  const [id, setId] = useState<IState["id"]>(0);

  const menu = [
    {
      id: 1,
      title: "ПАРКОВКА",
      description:
        "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах",
    },
    {
      id: 2,
      title: "БЕНЗИН",
      description: "Полный бак на любой заправке города за наш счёт",
    },
    {
      id: 3,
      title: "СТРАХОВКА ",
      description: "Полная страховка автомобиля",
    },
    {
      id: 4,
      title: "ОБСЛУЖИВАНИЕ",
      description: "Автомобиль проходит еженедельное ТО",
    },
  ];

  //перемещение по меню
  const handleOnClickMenuItem = (id: number) => {
    setId(id);
  };

  //очистка меню после закрытия
  useEffect(() => {
    if (!isOpenMenu || isOpenProfile) {
      setId(0);
    }
  });

  return (
    <div className={`menu menu${!isOpenMenu && !isOpenProfile && "--hidden"}`}>
      <div className='menu__list'>
        {isOpenMenu && (
          <MenuPage
            menu={menu}
            idNumber={id}
            handleOnClickMenuItem={handleOnClickMenuItem}
          />
        )}
        {isOpenProfile && <ProfilePage handleUserLogOut={handleUserLogOut} />}
      </div>
      <div className='menu__transparent'>
        {isOpenMenu &&
          menu
            .filter((item) => item.id === id)
            .map((value) => <Description text={value.description} />)}
      </div>
    </div>
  );
};
