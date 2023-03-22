import React from "react";

import { AppButton } from "../../../../components/app-button/AppButton";
import { AppInput } from "../../../../components/app-input/AppInput";
import { COLORS } from "../../../../constants/colors";
import { RegistrationModal } from "./RegistrationModal";
import "./styles.scss";
import { Api } from "../../../../services/api.service";
import { AuthService } from "../../../../services/auth.service";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../../../store/store";
import { DotsFlashing } from "../../../../components/loading/DotsFlashing";

interface IProps {
  toggleIsRegVisible: () => void;
  isRegVisible: boolean;
  toggleAuthVisible: () => void;
}

interface IState {
  email: string;
  password: string;
  error: string;
  isDisabled: boolean;
}

type DispatchProps = ReturnType<typeof mapDispatch>;
type StateProps = ReturnType<typeof mapState>;
type Props = DispatchProps & IProps & StateProps;

class AuthModalComponent extends React.Component<Props, IState> {
  state = {
    email: "",
    password: "",
    status: "",
  };
  isEmail = this.state.email === "Я";
  isPassword = this.state.password === "Я";
  //обработчик имени юзера
  handleUserNameChange = (email: string) => {
    this.setState({ email });
  };

  //обработчик пароля юзера
  handleUserPasswordChange = (password: string) => {
    this.setState({ password });
  };

  //переключение на страницу регистрации и обратно на аутентификацию
  handleRegistrationPage = () => {
    this.props.toggleIsRegVisible();
    this.setState((prevState) => ({
      ...prevState,
      email: "",
      password: "",
      status: "",
    }));
  };
  //обработчик ввода логина и пароля и отправки данных на сервер
  handleAuthLogin = () => {
    this.setState((prevState) => ({ ...prevState, status: "waiting" }));
    Api.login(this.state.email, this.state.password)
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

  render() {
    const { password, email, status } = this.state;
    const { isRegVisible, toggleAuthVisible } = this.props;
    const {
      handleRegistrationPage,
      handleUserPasswordChange,
      handleUserNameChange,
      handleAuthLogin,
      isEmail,
      isPassword,
    } = this;

    return (
      <div className="authModal__container">
        {isRegVisible ? (
          <RegistrationModal
            {...{ handleRegistrationPage, toggleAuthVisible }}
          />
        ) : (
          <div className="authModal__contentContainer">
            <div className="authModal__inputs">
              <AppInput
                key={"newEmail"}
                iconColor={email ? COLORS.PRIMARY : COLORS.GREY}
                placeholder="введите Email"
                typeField={"email"}
                label="Email"
                value={email}
                onChangeText={handleUserNameChange}
                leftIcon={"User"}
              />
              <AppInput
                key={"newPassword"}
                iconColor={password ? COLORS.PRIMARY : COLORS.GREY}
                placeholder="введите пароль"
                label="Password"
                value={password}
                onChangeText={handleUserPasswordChange}
                leftIcon={"Lock"}
                typeField="password"
              />
              <div onClick={handleAuthLogin}>
                <AppButton isDisabled={!(password && email)} text={"Войти"} />
              </div>
            </div>
            <div className="logpage__notification">
              {status === "unknown" && (
                <span>Такого пользователя не существует</span>
              )}
              {status === "waiting" && <DotsFlashing />}
              {status === "incorrect" && (
                <span>Проверьте правильность ввода логина и/или пароля</span>
              )}
            </div>
            <div className="logpage__regcontainer">
              <span>Впервые на сайте? </span>
              <span onClick={handleRegistrationPage}>Зарегистрироваться</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapDispatch = (dispatch: Dispatch) => ({
  setUser: dispatch.user.setUser,
});
const mapState = (state: RootState, ownProps: IProps) => ({
  toggleIsRegVisible: ownProps.toggleIsRegVisible,
  isRegVisible: ownProps.isRegVisible,
  toggleAuthVisible: ownProps.toggleAuthVisible,
});
export const AuthModal = connect(mapState, mapDispatch)(AuthModalComponent);
