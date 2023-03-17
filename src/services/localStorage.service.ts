import { ICity } from "./../interfaces/city";

class LocalStorageServizz {
  setCurrentCity(city: ICity["name"]) {
    localStorage.setItem("currentCity", city);
  }
  getCurrentCity() {
    return localStorage.getItem("currentCity");
  }
}
export const LocalStore = new LocalStorageServizz();
