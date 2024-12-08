export type TloginRequest = {
  email: string;
  password: string;
};

export interface IData {
  access_token: string;
  user: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  email_verified_at: string | null;
  is_admin: boolean;
  create_at: string;
  update_at: string;
}

export interface IAuthResponse {
  data: IData;
  message: string;
  status: number;
  locale: string;
}
