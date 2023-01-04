import axios from "axios";

class GeoService {
  token = "de92eb9f77a647dcb8974b4f382ab0da7891e0db";
  private instance = axios.create({
    baseURL: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + this.token,
    },
  });

  postLocation(credentials: any) {
    return this.instance.post("/geolocate/address", {
      ...credentials,
      radius_meters: 10,
    });
  }
}

export const Geo = new GeoService();
