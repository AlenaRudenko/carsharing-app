import { useNavigate } from "react-router-dom";
import "./styles.scss";

interface IProps {
  navigationItem: string;
  path: string;
}

export const OrderNavigation = ({ navigationItem, path }: IProps) => {
  const navigate = useNavigate();
  return (
    <div className='navigationItem__container' onClick={() => navigate(path)}>
      <span>{navigationItem}</span>
    </div>
  );
};
