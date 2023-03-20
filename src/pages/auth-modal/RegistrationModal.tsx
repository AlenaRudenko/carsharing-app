import { useState } from "react";
import { AppButton } from "../../components/app-button/AppButton";
import { AppInput } from "../../components/app-input/AppInput";
import { TEvent } from "../../interfaces/event";
import { Api } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { Dispatch } from "./../../store/store";
import { useDispatch } from "react-redux";
import "./styles.scss";
import { Tooltip } from "../../components/tooltip/Tooltip";

interface IState {
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface IProps {
  handleRegistrationPage: () => void;
  toggleAuthVisible: () => void;
}

export const RegistrationModal = ({
  handleRegistrationPage,
  toggleAuthVisible,
}: IProps) => {
  const [login, setLogin] = useState<IState["login"]>("");
  const [email, setEmail] = useState<IState["email"]>("");
  const [password, setPassword] = useState<IState["password"]>("");
  const [status, setStatus] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState<IState["confirmPassword"]>("");

  const dispatch = useDispatch<Dispatch>();
  //обработчик ввода логина
  const handleLogin = (e: TEvent) => {
    setLogin(e.target.value);
  };
  //обработчик ввода email
  const handleEmail = (e: TEvent) => {
    setEmail(e.target.value);
  };
  //обработчик ввода пароля
  const handlePassword = (e: TEvent) => {
    setPassword(e.target.value);
  };
  //обработчик повторного ввода пароля
  const handleConfirmPassword = (e: TEvent) => {
    setConfirmPassword(e.target.value);
  };
  const handleRegistrationData = () => {
    // Api.register({ fname: login, email, password })
    //   .then((response) => {
    //     AuthService.setToken(response.data.tokens);
    //     Api.setToken(response.data.tokens.accessToken);
    //     dispatch.user.setUser(response.data.user);
    //   })
    //   .catch((error) => console.log("BLYAT", error));
  };
  const onMouseOverListener = (e: any) => {
    e.stopPropagation();
    if (!isLogin && login) {
      const timer = setTimeout(() => {
        console.log("нихуясе");
      }, 1);
    }
  };
  const isEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
  const isLogin = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/g).test(login);
  const isPassword = new RegExp(
    /(?=^.{6,10}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g
  ).test(password);
  return (
    <div className="regpage__container">
      <div className="regpage__form">
        <Tooltip text={} />
        <div
          className="listener "
          onPointerLeave={(e) => onMouseOverListener(e)}
        >
          <AppInput
            key={"login"}
            hasError={!isLogin}
            errorMessage={"неверный логин"}
            leftIcon={"UserPlus"}
            value={login}
            label={"login"}
            onChange={handleLogin}
            placeholder={"введите логин"}
          />
        </div>

        <AppInput
          key={"email"}
          errorMessage={"неверный Email"}
          hasError={!isEmail}
          leftIcon={"Mail"}
          value={email}
          label={"email"}
          onChange={handleEmail}
          placeholder={"введите email"}
        />
        <AppInput
          key={"password"}
          hasError={!isPassword}
          errorMessage={"Пароль не соответствует требованиям безопасности"}
          leftIcon={"Lock"}
          value={password}
          typeField={"password"}
          label={"password"}
          onChange={handlePassword}
          placeholder={"придумайте пароль"}
        />
        <AppInput
          key={"confirmPassword"}
          hasError={password !== confirmPassword}
          errorMessage={"пароли не совпадают"}
          leftIcon={"Lock"}
          typeField={"password"}
          value={confirmPassword}
          label={"confirm password"}
          onChange={handleConfirmPassword}
          placeholder={"повторите пароль"}
        />
      </div>
      <div
        onClick={() => {
          handleRegistrationData();
          handleRegistrationPage();
          toggleAuthVisible();
        }}
      >
        <AppButton
          backgroundColor="blue"
          isDisabled={false}
          marginTop={20}
          text="Зарегистрироваться"
        />
      </div>
    </div>
  );
};
