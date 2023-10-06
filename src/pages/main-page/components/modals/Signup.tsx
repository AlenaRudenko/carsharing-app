import { useState, useReducer, useEffect } from "react";
import { AppButton } from "../../../../components/app-button/AppButton";
import { AppInput } from "../../../../components/app-input/AppInput";
import { TEvent } from "../../../../interfaces/event";
import { TAction } from "../../../../interfaces/useReducerTypes";
import { Api } from "../../../../services/api.service";
import { AuthService } from "../../../../services/auth.service";
import { Dispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import "./styles.scss";

const initialState = {
  login: "",
  email: "",
  password: "",
  confirmedPassword: "",
};
interface IState {
  login: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

const reducer = (state: IState, action: TAction) => {
  switch (action.type) {
    case "setLogin": {
      return {
        ...state,
        login: action.payload,
      };
    }
    case "setEmail": {
      return {
        ...state,
        email: action.payload,
      };
    }
    case "setPassword": {
      return {
        ...state,
        password: action.payload,
      };
    }
    case "setConfirmedPassword": {
      return {
        ...state,
        confirmedPassword: action.payload,
      };
    }
    default:
      return state;
  }
};

interface IProps {
  handleRegistrationPage: () => void;
  toggleAuthVisible: () => void;
  isDisabledSignupButton: boolean;
  handleRegistrationData: (
    login: string,
    email: string,
    password: string,
  ) => void;
  toggleSignupButton: (value: boolean) => void;
  message: string;
}

export const SignupModal = ({
  handleRegistrationPage,
  toggleAuthVisible,
  isDisabledSignupButton,
  handleRegistrationData,
  toggleSignupButton,
  message,
}: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const RematchDispatch = useDispatch<Dispatch>();

  //обработчик ввода логина

  const handleLogin = (e: TEvent) => {
    dispatch({ type: "setLogin", payload: e.target.value });
  };

  //обработчик ввода email
  const handleEmail = (e: TEvent) => {
    dispatch({ type: "setEmail", payload: e.target.value });
  };

  //обработчик ввода пароля
  const handlePassword = (e: TEvent) => {
    dispatch({ type: "setPassword", payload: e.target.value });
  };

  //обработчик повторного ввода пароля
  const handleConfirmPassword = (e: TEvent) => {
    dispatch({ type: "setConfirmedPassword", payload: e.target.value });
  };

  //проверки полей перед отправкой на сервер
  const isEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(
    state.email,
  );
  const isLogin = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/g).test(
    state.login,
  );
  const isPassword = new RegExp(
    /(?=^.{6,10}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g,
  ).test(state.password);

  const isConfirmPassword = state.password === state.confirmedPassword;

  //зависимость для useEffect для кнопки регистрации
  const isRight =
    isEmail &&
    isLogin &&
    isPassword &&
    isConfirmPassword &&
    state.password === state.confirmedPassword;

  //тоггл кнопки регистрации
  useEffect(() => {
    if (isRight) {
      toggleSignupButton(false);
    } else toggleSignupButton(true);
  }, [isRight]);

  return (
    <div className="signup-container">
      <div>
        <AppInput
          key={"login"}
          hasError={!isLogin}
          errorMessage={"неверный логин"}
          leftIcon={"UserPlus"}
          value={state.login}
          label={"login"}
          onChange={handleLogin}
          placeholder={"введите логин"}
        />

        <AppInput
          key={"email"}
          errorMessage={"неверный Email"}
          hasError={!isEmail}
          leftIcon={"Mail"}
          value={state.email}
          label={"email"}
          onChange={handleEmail}
          placeholder={"введите email"}
        />
        <AppInput
          key={"password"}
          hasError={!isPassword}
          errorMessage={"Пароль не соответствует требованиям безопасности"}
          leftIcon={"Lock"}
          value={state.password}
          typeField={"password"}
          label={"password"}
          onChange={handlePassword}
          placeholder={"придумайте пароль"}
        />
        <AppInput
          key={"confirmPassword"}
          hasError={state.password !== state.confirmedPassword}
          errorMessage={"пароли не совпадают"}
          leftIcon={"Lock"}
          typeField={"password"}
          value={state.confirmedPassword}
          label={"confirm password"}
          onChange={handleConfirmPassword}
          placeholder={"повторите пароль"}
        />
      </div>

      <div className="signup-container__notification"></div>
      {message && <span>{message}</span>}
      <div
        onClick={() => {
          handleRegistrationData(state.login, state.email, state.password);
        }}
      >
        <AppButton
          marginTop={10}
          backgroundColor="blue"
          isDisabled={isDisabledSignupButton}
          text="Зарегистрироваться"
        />
      </div>
    </div>
  );
};
