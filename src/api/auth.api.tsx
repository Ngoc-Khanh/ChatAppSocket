import {
  IAuthResponse,
  TloginRequest,
  TRegisterRequest,
} from "@/data/types/auth.type";
import { apiGet, apiPost, getBearerToken } from "./api";

export const AuthApi = {
  async fetchLogin(credentials: TloginRequest) {
    const response = await apiPost<TloginRequest, IAuthResponse>(
      "v1/auth/login",
      credentials
    );
    return response.data;
  },

  async fetchRegister(credentials: TRegisterRequest) {
    const response = await apiPost<TRegisterRequest, IAuthResponse>(
      "v1/auth/register",
      credentials
    );
    return response.data;
  },

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
