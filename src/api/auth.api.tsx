import { IAuthResponse, TloginRequest } from "@/data/types/auth.types";
import { apiGet, apiPost, getBearerToken } from "./api";

export const AuthApi = {
  async fetchLogin(credentials: TloginRequest) {
    const response = await apiPost<TloginRequest, IAuthResponse>(
      "v1/auth/login",
      credentials
    );
    return response.data;
  },

  async fetchRegister() {},

  async fetchLogout() {
    const response = await apiPost(
      "v1/auth/logout",
      {},
      { headers: getBearerToken() }
    );
    return response.data;
  },

  async getProfile() {
    const response = await apiGet("v1/auth/profile", {
      headers: getBearerToken(),
    });
    return response.data;
  },
};
