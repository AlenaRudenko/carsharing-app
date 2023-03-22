import { useState } from "react";
import { AppButton } from "../../../../components/app-button/AppButton";
import { AppInput } from "../../../../components/app-input/AppInput";
import { TEvent } from "../../../../interfaces/event";
import { Api } from "../../../../services/api.service";
import { AuthService } from "../../../../services/auth.service";
import { Dispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import "./styles.scss";

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
  const [isDisabled, setIsDisabled] = useState(false);
  const [confirmPassword, setConfirmPassword] =
    useState<IState["confirmPassword"]>("");

  const dispatch = useDispatch<Dispatch>();

  //обработчик ввода логина
  const handleLogin = (e: TEvent) => {
    setIsDisabled(false);
    setLogin(e.target.value);
  };

  //обработчик ввода email
  const handleEmail = (e: TEvent) => {
    setIsDisabled(false);
    setEmail(e.target.value);
  };

  //обработчик ввода пароля
  const handlePassword = (e: TEvent) => {
    setIsDisabled(false);
    setPassword(e.target.value);
  };

  //обработчик повторного ввода пароля
  const handleConfirmPassword = (e: TEvent) => {
    setIsDisabled(false);
    setConfirmPassword(e.target.value);
  };

  //проверка уже созданного юзера
  const handleSubmitForms = (message: string) => {
    if (message === "USER_ALREADY_EXIST") {
      setIsDisabled(true);
    } else setIsDisabled(false);
  };

  //обработчик отправки данных нового юзера на сервер
  const handleRegistrationData = () => {
    Api.register({ fname: login, email, password })
      .then((response) => {
        AuthService.setToken(response.data.tokens);
        Api.setToken(response.data.tokens.accessToken);
        dispatch.user.setUser(response.data.user);
      })
      .catch((error) => handleSubmitForms(error.response.data.message));
  };

  //проверки полей перед отправкой на сервер
  const isEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
  const isLogin = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/g).test(login);
  const isPassword = new RegExp(
    /(?=^.{6,10}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g
  ).test(password);
  const isConfirmPassword = password === confirmPassword;

  return (
    <div className="regpage__container">
      <div className="regpage__form">
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

      <div className="regpage__notification">
        {isDisabled && <span>пользователь уже существует</span>}
      </div>

      <div
        onClick={() => {
          handleRegistrationData();
          // handleRegistrationPage();
          // toggleAuthVisible();
        }}
      >
        <AppButton
          marginTop={10}
          backgroundColor="blue"
          isDisabled={
            isDisabled ||
            !(isEmail && isLogin && isPassword && isConfirmPassword)
          }
          text="Зарегистрироваться"
        />
      </div>
    </div>
  );
};
