import { useContext } from "react";
import { NavContext } from "../../context/NavState";
import "./styles.scss";

export const Menu = () => {
  const { isOpen } = useContext(NavContext);
  return (
    <div className={`menu menu${isOpen ? "--open" : "--close"}`}>
      <div className='menu__list'>
        {isOpen && (
          <>
            <span>1</span>
            <span>1</span>
            <span>1</span>
          </>
        )}
      </div>
      <div className='menu__transparent' />
    </div>
  );
};
