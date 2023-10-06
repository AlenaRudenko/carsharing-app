import React from "react";
import "./styles.scss";
import { SignupModal } from "../modals/Signup";
import { Api } from "../../../../services/api.service";
import { AuthService } from "../../../../services/auth.service";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../../../store/store";
import { LoginModal } from "../modals/Login";

interface OwnProps {
  toggleIsRegVisible: () => void;
  isRegVisible: boolean;
  toggleAuthVisible: () => void;
  authIndex: number | null;
  handleAuthIndex:(value:number | null) => void
}

interface IState {
  status: string;
  isDisabledSignupButton: boolean;
  message: string;
}
type LoginData = {
  password: string;
  email: string;
};

type DispatchProps = ReturnType<typeof mapDispatch>;
type StateProps = ReturnType<typeof mapState>;
type Props = DispatchProps & OwnProps & StateProps;

class AuthenticationComponent extends React.Component<Props, IState> {
  state = {
    status: "",
    isDisabledSignupButton: true,
    message: "",
  };

  //переключение на страницу регистрации и обратно на аутентификацию
  handleRegistrationPage = () => {
    this.props.toggleIsRegVisible();
    this.setState((prevState) => ({
      ...prevState,
      status: "",
      message: "",
    }));
  };

  //обработчик ввода логина и пароля и отправки данных на сервер
  handleAuthLogin = ({ email, password }: LoginData) => {
    this.setState((prevState) => ({ ...prevState, status: "waiting" }));
    Api.login(email, password)
      .then((response) => {
        AuthService.setToken(response.data.tokens);
        Api.setToken(response.data.tokens.accessToken);
        this.props.setUser(response.data.user);
        this.setState((prevState) => ({ ...prevState, status: "success" }));
      })
      .catch((error) => this.handleError(error.response.data.message));
  };

  //обработчик статуса ошибки
  handleError = (error: string) => {
    if (error === "USER NOT FOUND") {
      this.setState((prevState) => ({
        ...prevState,
        status: "unknown",
      }));
    } else {
      if (error === "BAD_CREDENTIAL") {
        this.setState((prevState) => ({ ...prevState, status: "incorrect" }));
      }
    }
  };
  //проверка уже созданного юзера
  handleSubmitForms = (message: string) => {
    if (message === "USER_ALREADY_EXIST") {
      this.setState((prevState) => ({
        ...prevState,
        isDisabledSignupButton: true,
      }));
      this.setState((prevState) => ({
        ...prevState,
        message: "Пользователь уже существует",
      }));
    } else
      this.setState((prevState) => ({
        ...prevState,
        isDisabledSignupButton: false,
      }));
  };

  //обработчик смены статуса кнопки регистрации
  toggleSignupButton = (value: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      isDisabledSignupButton: value,
    }));
  };
  //обработчик отправки данных нового юзера на сервер
  handleRegistrationData = (login: string, email: string, password: string) => {
    Api.register({
      fname: login,
      email: email,
      password: password,
    })
      .then((response) => {
        AuthService.setToken(response.data.tokens);
        Api.setToken(response.data.tokens.accessToken);
        this.props.setUser(response.data.user);
      })
      .catch((error) => this.handleSubmitForms(error.response.data.message));
  };
  render() {
    const { status, isDisabledSignupButton, message } = this.state;
    const { isRegVisible, toggleAuthVisible, authIndex,handleAuthIndex } = this.props;
    const {
      toggleSignupButton,
      handleRegistrationPage,
      handleAuthLogin,
      handleRegistrationData,
    } = this;

    return (
      <div className="authModal__container">
        {authIndex === 222 && (
          <SignupModal
            key={"signup"}
            {...{
              isDisabledSignupButton,
              handleRegistrationData,
              handleRegistrationPage,
              toggleAuthVisible,
              toggleSignupButton,
              message,
            }}
          />
        )}
        {authIndex === 111 && (
          <LoginModal
            key={"login"}
            status={status}
            handleAuthLogin={handleAuthLogin}
            handleRegistrationPage={handleRegistrationPage}
            handleAuthIndex={handleAuthIndex}
          />
        )}
      </div>
    );
  }
}
const mapDispatch = (dispatch: Dispatch) => ({
  setUser: dispatch.user.setUser,
});
const mapState = (state: RootState, ownProps: OwnProps) => ({
  toggleIsRegVisible: ownProps.toggleIsRegVisible,
  isRegVisible: ownProps.isRegVisible,
  toggleAuthVisible: ownProps.toggleAuthVisible,
  authIndex: ownProps.authIndex,
  handleAuthIndex:ownProps.handleAuthIndex
});
export const AuthenticationForm = connect(
  mapState,
  mapDispatch,
)(AuthenticationComponent);
