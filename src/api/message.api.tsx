import { IMessageSent } from "@/data/types/message.type";
import { apiGet, apiPost, getBearerToken } from "./api";

export const MessageAPI = {
  async fetchMessages(id: string | number) {
    const response = await apiGet(`v1/message/show-message/${id}`, {
      headers: getBearerToken(),
    });
    return response.data;
  },

  async saveMessage(data: IMessageSent) {
    const response = await apiPost("v1/message/send-message", data, {
      headers: getBearerToken(),
    });
    return response.data;
  },
};
