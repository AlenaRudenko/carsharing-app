import { useNavigate } from "react-router-dom";
import "./styles.scss";

interface IProps {
  navigationItem: string;
  path: string;
  status: string[];
}

export const OrderNavigation = ({ navigationItem, path, status }: IProps) => {
  const navigate = useNavigate();

  //обработчик перемещения по меню сверху
  const handleOnClick = () => {
    if (status.includes(path)) {
      return navigate(path);
    } else return () => {};
  };
  return (
    <div
      className={`navigationItem__container navigationItem__container${
        status.includes(path) ? "--active" : "--unactive"
      }`}
      onClick={handleOnClick}
    >
      <span>{navigationItem}</span>
    </div>
  );
};
