import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.API_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBearerToken = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  return { Authorization: `Bearer ${token}` };
};

// API GET
export const apiGet = async <ResponseData = any>(
  url: string,
  config?: AxiosRequestConfig
) => api.get<ResponseData>(url, config);

// API POST
export const apiPost = async <PostData = any, ResponseData = any>(
  url: string,
  data?: PostData,
  config?: AxiosRequestConfig
) => api.post<PostData, AxiosResponse<ResponseData>>(url, data, config);

// API PUT
export const apiPut = async <PutData = any, ResponseData = any>(
  url: string,
  data?: PutData,
  config?: AxiosRequestConfig
) => api.put<PutData, AxiosResponse<ResponseData>>(url, data, config);

// API DELETE
export const apuDelete = async <ResponseData = any>(
  url: string,
  config?: AxiosRequestConfig
) => api.delete<ResponseData>(url, config);

export default api;
