import Hamburger from "hamburger-react";

interface IProps {
  toggleIsOpenMenu: () => void;
  isOpenMenu: boolean;
}

export const NavButton = ({ toggleIsOpenMenu, isOpenMenu }: IProps) => {
  return (
    <Hamburger toggled={isOpenMenu} toggle={toggleIsOpenMenu} color={"white"} />
  );
};
