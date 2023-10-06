import { Description } from "./components/description/Description";
import { useState, useEffect } from "react";
import "./styles.scss";
import { MenuPage } from "./menu-page/MenuPage";
import { ProfilePage } from "./profile-page/ProfilePage";
import MenuArray from "./data/nav-data";
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
  //перемещение по меню
  const handleOnClickMenuItem = (id: number) => {
    setId(id);
  };

  //очистка меню после закрытия
  useEffect(() => {
    if (!isOpenMenu || isOpenProfile) {
      setId(0);
    }
  }, [isOpenMenu, isOpenProfile]);

  return (
    <div className={`menu menu${!isOpenMenu && !isOpenProfile && "--hidden"}`}>
      <div className="menu__list">
        {isOpenMenu && (
          <MenuPage
            menu={MenuArray}
            idNumber={id}
            handleOnClickMenuItem={handleOnClickMenuItem}
          />
        )}
        {isOpenProfile && <ProfilePage handleUserLogOut={handleUserLogOut} />}
      </div>
      <div className="menu__transparent">
        {isOpenMenu &&
          MenuArray.filter((item) => item.id === id).map((value) => (
            <Description
              key={value.id}
              text={value.description}
              fullDescription={value.fullDescription}
            />
          ))}
      </div>
    </div>
  );
};
