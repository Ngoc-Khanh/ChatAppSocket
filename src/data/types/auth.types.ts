export type TloginRequest = {
  email: string;
  password: string;
};

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
  data: IUser;
  message: string;
  status: number;
  locale: string;
}
