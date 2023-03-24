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
  removeTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export const AuthService = new AuthClazz();
