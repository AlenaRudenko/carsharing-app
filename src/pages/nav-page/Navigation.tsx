import { NavButton } from "../../components/NavButton";
import { UserButton } from "../../components/user-button/UserButton";
import "./styles.scss";

export const Navigation = () => {
  return (
    <div className='sidebar'>
      <NavButton />
      <UserButton />
    </div>
  );
};
