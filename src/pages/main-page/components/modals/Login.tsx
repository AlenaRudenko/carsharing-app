import { useReducer } from "react";
import { AppInput } from "../../../../components/app-input/AppInput";
import { COLORS } from "../../../../constants/colors";
import { DotsFlashing } from "../../../../components/loading/DotsFlashing";
import { AppButton } from "../../../../components/app-button/AppButton";
import "./styles.scss";

type State = {
  password: string;
  email: string;
};

type Action = {
  type: string;
  payload?: any;
};
const initialState = { email: "", password: "" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "handleEmail": {
      return {
        ...state,
        email: action.payload,
      };
    }
    case "handlePassword": {
      return {
        ...state,
        password: action.payload,
      };
    }
    default:
      return state;
  }
};

interface IProps {
  handleAuthLogin: (value: State) => void;
  handleRegistrationPage: () => void;
  status: string | "";
  handleAuthIndex: (value: number | null) => void;
}

export const LoginModal = ({
  status,
  handleAuthLogin,
  handleRegistrationPage,
  handleAuthIndex,
}: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleLoginData = () => {
    handleAuthLogin(state);
  };
  return (
    <div className="login-container">
      <div>
        <AppInput
          key={"newEmail"}
          iconColor={state.email ? COLORS.PRIMARY : COLORS.GREY}
          placeholder="введите Email"
          typeField={"email"}
          label="Email"
          value={state.email}
          onChangeText={(text) =>
            dispatch({ type: "handleEmail", payload: text })
          }
          leftIcon={"User"}
        />
        <AppInput
          key={"newPassword"}
          iconColor={state.password ? COLORS.PRIMARY : COLORS.GREY}
          placeholder="введите пароль"
          label="Password"
          value={state.password}
          onChangeText={(text) =>
            dispatch({ type: "handlePassword", payload: text })
          }
          leftIcon={"Lock"}
          typeField="password"
        />
        <div>
          <AppButton
            onClick={handleLoginData}
            isDisabled={!(state.password && state.email)}
            text={"Войти"}
          />
        </div>
      </div>
      <div className="login-container__notification">
        {status === "waiting" && <DotsFlashing />}
        {status === "unknown" && <span>Пользователь не найден</span>}
        {status === "incorrect" && <span>Неверный логин и/или пароль</span>}
      </div>
      <div className="login-container__footer">
        <span>Впервые на сайте? </span>
        <span onClick={() => handleAuthIndex(222)}>Зарегистрироваться</span>
      </div>
    </div>
  );
};
