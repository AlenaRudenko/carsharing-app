import { useSelector } from "react-redux";
import { AppIcon } from "../app-icon/AppIcon";
import "./styles.scss";
import { RootState } from "../../store/store";
import { useEffect } from "react";

export const UserButton = () => {
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {}, []);
  return (
    <div className='user__button'>
      <AppIcon icon={"User"} size={30} />
      <span>{user?.fname}</span>
    </div>
  );
};
