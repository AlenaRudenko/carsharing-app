import { useState } from "react";
import { AppButton } from "../../components/app-button/AppButton";
import { AppInput } from "../../components/app-input/AppInput";
import { TEvent } from "../../interfaces/event";
import { Api } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { Dispatch } from "./../../store/store";
import { useDispatch } from "react-redux";
import "./styles.scss";

interface IState {
  login: string;
  email: string;
  password: string;
  checkPassword: string;
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
  const [checkPassword, setCheckPassword] =
    useState<IState["checkPassword"]>("");

  const dispatch = useDispatch<Dispatch>();
  const handleNewUserLogin = (e: TEvent) => {
    setLogin(e.target.value);
  };
  const handleNewUserEmail = (e: TEvent) => {
    setEmail(e.target.value);
  };
  const handleNewUserPassword = (e: TEvent) => {
    setPassword(e.target.value);
  };

  const handleCheckUserPassword = (e: TEvent) => {
    setCheckPassword(e.target.value);
  };
  const handleRegistrationData = () => {
    Api.register({ fname: login, email, password })
      .then((response) => {
        AuthService.setToken(response.data.tokens);
        Api.setToken(response.data.tokens.accessToken);
        dispatch.user.setUser(response.data.user);
      })
      .catch((error) => console.log("BLYAT", error));
  };
  const isEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
  return (
    <div className='regpage__container'>
      <div className='regpage__form'>
        <AppInput
          leftIcon={"UserPlus"}
          value={login}
          label={"login"}
          onChange={handleNewUserLogin}
          placeholder={"введите логин"}
        />
        <AppInput
          hasError={!isEmail}
          leftIcon={"Mail"}
          value={email}
          label={"email"}
          onChange={handleNewUserEmail}
          placeholder={"введите email"}
        />
        <AppInput
          leftIcon={"Lock"}
          value={password}
          typeField={"password"}
          label={"password"}
          onChange={handleNewUserPassword}
          placeholder={"придумайте пароль"}
        />
        <AppInput
          hasError={password !== checkPassword}
          errorMessage={"Неверный пароль"}
          leftIcon={"Lock"}
          typeField={"password"}
          value={checkPassword}
          label={"check password"}
          onChange={handleCheckUserPassword}
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
          backgroundColor='blue'
          isDisabled={false}
          marginTop={20}
          text='Зарегистрироваться'
        />
      </div>
    </div>
  );
};
