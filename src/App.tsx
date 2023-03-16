import { useEffect } from "react";
import "./App.css";
import { NavState } from "./context/NavState";
import { MainContent } from "./pages/main-page/MainContent";
import jwt_decode from "jwt-decode";
import { AuthService } from "./services/auth.service";
import { Api } from "./services/api.service";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./store/store";
import { IUser } from "./interfaces/user";

interface IToken {
  exp: number;
  iat: number;
  role: string;
  userId: string;
}
export const App = () => {
  const dispatch = useDispatch<Dispatch>();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const accessToken = AuthService.getAccessToken();
    if (accessToken) {
      const decodedHeader: IToken = jwt_decode(accessToken);
      Api.setToken(accessToken);
      Api.getUser(decodedHeader.userId).then((response) =>
        dispatch.user.setUser(response.data)
      );
    }
  }, []);

  return (
    <div className='main--container'>
      <NavState>
        <MainContent />
      </NavState>
    </div>
  );
};
