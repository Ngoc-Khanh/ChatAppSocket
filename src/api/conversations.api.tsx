import { apiGet, getBearerToken } from "./api";

export const ConversationAPI = {
  async getConversations() {
    const response = await apiGet("v1/conversation/user-conversation", {
      headers: getBearerToken(),
    });
    return response.data;
  },
};
