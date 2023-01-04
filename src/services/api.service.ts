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
  setToken(accessToken: TokenPack["accessToken"]) {
    this.instance.defaults.headers.common["Authtorization"] = accessToken;
  }

  getUser() {
    return this.instance.get("/users");
  }

  getCars() {
    return this.instance.get<ICar[]>("/cars");
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
