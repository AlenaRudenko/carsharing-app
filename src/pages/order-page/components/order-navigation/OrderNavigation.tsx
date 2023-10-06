import { useNavigate } from "react-router-dom";
import { TPath } from "../../../main-page/MainContent";
import "./styles.scss";

type TNavigationItem = {
  name: string;
  index: number;
  path: string;
};
interface IProps {
  navigationItem: TNavigationItem;
  confirmedOrderPaths: TPath[];
}

export const OrderNavigation = ({
  navigationItem,
  confirmedOrderPaths,
}: IProps) => {
  const navigate = useNavigate();
  const successPath = confirmedOrderPaths!.find(
    (item) => item!.name === navigationItem.path,
  );
  //обработчик перемещения по меню сверху
  const handleOnClick = () => {
    if (successPath) {
      return navigate(navigationItem.path);
    } else return () => {};
  };
  return (
    <div
      className={`navigationItem__container navigationItem__container${
        successPath ? "--active" : "--unactive"
      }`}
      onClick={handleOnClick}
    >
      <span>{navigationItem.name}</span>
    </div>
  );
};
