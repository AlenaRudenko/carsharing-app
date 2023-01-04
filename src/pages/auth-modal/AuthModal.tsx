import React from "react";

import { AppButton } from "./../../components/app-button/AppButton";
import { AppInput } from "../../components/app-input/AppInput";
import { COLORS } from "../../constants/colors";
import { RegistrationModal } from "./RegistrationModal";
import "./styles.scss";
import { Api } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import { IUser } from "../../interfaces/user";

interface IProps {
  toggleIsRegVisible: () => void;
  isRegVisible: boolean;
  toggleAuthVisible: () => void;
}
interface IState {
  email: string;
  password: string;
}
type DispatchProps = ReturnType<typeof mapDispatch>;
type StateProps = ReturnType<typeof mapState>;
type Props = DispatchProps & IProps & StateProps;

class AuthModalComponent extends React.Component<Props, IState> {
  state = {
    email: "",
    password: "",
  };
  handleUserNameChange = (email: string) => {
    this.setState({ email });
  };

  handleUserPasswordChange = (password: string) => {
    this.setState({ password });
  };
  handleRegistrationPage = () => {
    this.props.toggleIsRegVisible();
  };
  handleAuthLogin = () => {
    Api.login(this.state.email, this.state.password).then((response) => {
      AuthService.setToken(response.data.tokens);
      Api.setToken(response.data.tokens.accessToken);
      this.props.setUser(response.data.user);
    });
  };

  render() {
    const { password, email } = this.state;
    const { isRegVisible, toggleAuthVisible } = this.props;
    const {
      handleRegistrationPage,
      handleUserPasswordChange,
      handleUserNameChange,
      handleAuthLogin,
    } = this;

    return (
      <div className='authModal__container'>
        {isRegVisible ? (
          <RegistrationModal
            {...{ handleRegistrationPage, toggleAuthVisible }}
          />
        ) : (
          <div className='authModal__contentContainer'>
            <div className='authModal__inputs'>
              <AppInput
                iconColor={email ? COLORS.PRIMARY : COLORS.GREY}
                placeholder='введите Email'
                typeField={"email"}
                label='Email'
                value={email}
                onChangeText={handleUserNameChange}
                leftIcon={"User"}
              />
              <AppInput
                iconColor={password ? COLORS.PRIMARY : COLORS.GREY}
                placeholder='введите пароль'
                label='Password'
                value={password}
                onChangeText={handleUserPasswordChange}
                leftIcon={"Lock"}
                typeField='password'
              />
              <div onClick={handleAuthLogin}>
                <AppButton text={"Войти"} />
              </div>
            </div>
            <div className='logpage__regcontainer'>
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
