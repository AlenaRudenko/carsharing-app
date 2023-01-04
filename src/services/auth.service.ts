import { TokenPack } from "./../interfaces/token-pack";

class AuthClazz {
  setToken({ accessToken, refreshToken }: TokenPack) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
}

export const AuthService = new AuthClazz();
