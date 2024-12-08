export type Tlogin = {
  email: string;
  password: string;
}

export interface IUserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  email_verified_at: string;
  is_admin: boolean;
  blocked_at: string | null;
  created_at: string;
  updated_at: string;
}