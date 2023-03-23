import { useNavigate } from "react-router-dom";
import "./styles.scss";

interface IProps {
  navigationItem: string;
  path: string;
  status: string;
}

export const OrderNavigation = ({ navigationItem, path, status }: IProps) => {

  const navigate = useNavigate();
  return (
    <div className="navigationItem__container" onClick={() => navigate(path)}>
      <span>{navigationItem}</span>
    </div>
  );
};
