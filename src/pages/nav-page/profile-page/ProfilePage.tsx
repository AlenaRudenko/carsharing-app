import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../../store/store";
import { AppButton } from "../../../components/app-button/AppButton";
import { AuthService } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

interface IProps {
  handleUserLogOut: () => void;
}

export const ProfilePage = ({ handleUserLogOut }: IProps) => {
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<Dispatch>();

  const navigate = useNavigate();

  const handleOnClickLogOut = () => {
    dispatch.user.removeUser();
    AuthService.removeTokens();
    handleUserLogOut();
    navigate("/");
  };

  return (
    <div className="profilePage__container">
      <h2>Ваш профиль</h2>
      <table>
        <tbody>
          <tr>
            <td>{"имя"}</td>
            <td>{user!.lname || "-"}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>{"фамилия"}</td>
            <td>{user!.fname || "-"}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>{"email"}</td>
            <td>{user!.email}</td>
          </tr>
        </tbody>
      </table>
      <AppButton onClick={handleOnClickLogOut} text={"Выйти"} />
    </div>
  );
};
