export interface IData {
  user?: string;
  role?: string;
  content: string;
  timestamp: string;
}

export interface IMessageSent {
  conversation_id: number;
  message: string;
}

export interface IMessageResponse {
  data: IData[];
  message: string;
  status: number;
  locale: string;
  errors: null | Record<string, unknown>;
}