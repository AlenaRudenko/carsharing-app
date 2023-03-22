import { useSelector } from "react-redux";
import { AppIcon } from "../../../../components/app-icon/AppIcon";
import "./styles.scss";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";

interface IProps {
  toggleIsOpenProfile: () => void;
  isOpenProfile: boolean;
}

export const UserButton = ({ toggleIsOpenProfile, isOpenProfile }: IProps) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="user__button" onClick={toggleIsOpenProfile}>
      <AppIcon icon={"User"} size={30} />
      <span>{user?.fname}</span>
    </div>
  );
};
