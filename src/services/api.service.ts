import { ITariff } from "./../interfaces/tariffs";
import { AuthService } from "./auth.service";
import { IUser } from "./../interfaces/user";
import { TokenPack } from "./../interfaces/token-pack";
import { ICity } from "./../interfaces/city";
import { ICar } from "./../interfaces/car";
import axios from "axios";

class ApiService {
  private instance = axios.create({
    baseURL: "https://api.need-car.online",
    // headers: {
    //   "Content-type": "application/json",
    // },
  });
  constructor() {
    this.instance.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest.sent) {
          const refToken = AuthService.getRefreshToken();

          if (!refToken) {
            return this.instance(prevRequest);
          }

          const result = await this.refreshTokensFn(refToken);

          if (result?.accessToken) {
            AuthService.removeTokens();
            AuthService.setToken(result);
            return this.instance({
              ...prevRequest,
              headers: {
                ...prevRequest.headers,
                Authorization: result?.accessToken,
                sent: true,
              },
            });
          }

          return this.instance(prevRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  refreshTokensFn = async (refreshToken: TokenPack["refreshToken"]) => {
    try {
      const response = await this.instance.post<TokenPack>(
        "/auth/update-token",
        { refreshToken }
      );
      const newTokens = response.data;
      return newTokens;
    } catch (error) {
      AuthService.removeTokens();
    }
  };

  setToken(accessToken: TokenPack["accessToken"]) {
    this.instance.defaults.headers.common["Authorization"] = accessToken;
  }

  getUsers() {
    return this.instance.get("/users");
  }

  getCars() {
    return this.instance.get<ICar[]>("/cars");
  }
  getTariffs() {
    return this.instance.get<ITariff[]>("/tariffs");
  }
  getUser(userId: string) {
    return this.instance.get<IUser>(`/users/${userId}`);
  }

  getCities() {
    return this.instance.get<ICity[]>("/cities");
  }

  login(email: string, password: string) {
    return this.instance.post<{ tokens: TokenPack; user: IUser }>(
      "/auth/login",
      { email, password }
    );
  }

  register(credentials: any) {
    return this.instance.post<{ tokens: TokenPack; user: IUser }>(
      "/auth/register",
      credentials
    );
  }
}

export const Api = new ApiService();
