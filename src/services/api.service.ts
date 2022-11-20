import { ICity } from "./../interfaces/city";
import { ICar } from "./../interfaces/car";
import axios from "axios";

class ApiService {
  private instance = axios.create({
    baseURL: "https://carsharing-api.up.railway.app",
    headers: {
      "Content-type": "application/json",
    },
  });

  getUser() {
    return this.instance.get("/users");
  }

  getCars() {
    return this.instance.get<ICar[]>("/cars");
  }

  getCities() {
    return this.instance.get<ICity[]>("/cities");
  }
}

export const Api = new ApiService();
