import { NavButton } from "./components/nav-button/NavButton";
import { UserButton } from "./components/user-button/UserButton";
import "./styles.scss";

interface IProps {
  toggleIsOpenMenu: () => void;
  isOpenMenu: boolean;
  isOpenProfile: boolean;
  toggleIsOpenProfile: () => void;
}

export const Navigation = ({
  toggleIsOpenMenu,
  isOpenMenu,
  isOpenProfile,
  toggleIsOpenProfile,
}: IProps) => {
  return (
    <div className="sidebar">
      <NavButton toggleIsOpenMenu={toggleIsOpenMenu} isOpenMenu={isOpenMenu} />
      <UserButton
        isOpenProfile={isOpenProfile}
        toggleIsOpenProfile={toggleIsOpenProfile}
      />
    </div>
  );
};
