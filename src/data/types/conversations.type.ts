export interface IConversation {
  conversation_id: number;
  user1_name: string;
  user2_name: string;
  last_message: string;
  last_message_time: string;
}

export interface IConversationResponse {
  data: IConversation[];
  message: string;
  status: number;
  locale: string;
}
