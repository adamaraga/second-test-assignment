import axios from "axios";
import { AuthDataType } from "../types";

const apiURL = process.env.REACT_APP_API_URL + "/api";

interface AddCommentType {
  postId: string;
  parentId?: string;
  operation: string;
  number: string;
  userId: string;
}

export const login = (data: AuthDataType) => {
  return axios.post(`${apiURL}/auth/login`, data);
};

export const signup = (data: AuthDataType) => {
  return axios.post(`${apiURL}/auth/register`, data);
};

export const addNumberPost = (
  number: string,
  userId: string,
  token: string
) => {
  return axios.post(
    `${apiURL}/numberPost/add`,
    { number, userId },
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
};

export const addComment = (data: AddCommentType, token: string) => {
  return axios.post(`${apiURL}/comment/add`, data, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const fetchPosts = async (limit: number, page: number) => {
  return axios.get(`${apiURL}/numberPost/all/${page}/${limit}`);
};
