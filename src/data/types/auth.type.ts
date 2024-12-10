export type TloginRequest = {
  email: string;
  password: string;
};

export type TRegisterRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IData {
  access_token: string;
  user: IUser;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  email_verified_at: string | null;
  is_admin: boolean | number;
  blocked_at: string | null;
  create_at: string;
  update_at: string;
}

export interface IAuthResponse {
  data: IData;
  message: string;
  status: number;
  locale: string;
}
