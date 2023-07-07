import axios from "axios";
import {
  UserInfo_DTO,
  Main_graph_Api_DTO,
  CardData,
  CardDataDetail,
} from "@/types/dashborad.types";

let token;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const Main_graph_Api = async (
  userid?: string
): Promise<Main_graph_Api_DTO | number> => {
  let url = `/api/graph${userid ? `?userId=${userid}` : ""}`;

  try {
    const response = await axiosInstance.get(url, {
      validateStatus: function (status) {
        return status < 600;
      },
    });

    if (response.status >= 500) {
      return response.status;
    }

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Share_graph_Api = async (
  userid?: string
): Promise<Main_graph_Api_DTO> => {
  let url = `/api/share${userid ? `?userId=${userid}` : ""}`;

  try {
    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const User_Info_Api = async (userid?: string): Promise<UserInfo_DTO> => {
  let url = `/api/${userid ? `other/${userid}` : `user`}`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Card_Info_Api = async (
  tagname?: string | null,
  userid?: string | undefined,
  page?: number | undefined,
  perPage?: number | undefined
): Promise<CardData> => {
  let url = `/api/cards/tag${tagname ? `?tagname=${tagname}` : ""}${
    userid ? `&userId=${userid}` : ""
  }${page ? `&page=${page}` : "&page=1"}${
    perPage ? `&perPage=${perPage}` : "&perPage=9"
  }
  `;
  try {
    const response = await axiosInstance.get(url);

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Card_Detail_Api = async (
  cardId?: number | null,
  userid?: string | undefined
): Promise<CardDataDetail> => {
  let url = `/api/cards/info${cardId ? `?cardId=${cardId}` : ""}${
    userid ? `&userId=${userid}` : ""
  }`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Card_Edit_Api = async (
  params?: number | undefined,
  data?: string | undefined
) => {
  try {
    const response = await axiosInstance.patch(`/api/cards/update/${params}`, {
      content: data,
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Card_Delete_Api = async (params?: number | undefined) => {
  try {
    const response = await axiosInstance.delete(`/api/cards/delete/${params}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Add_Follow_API = async (followId?: string | undefined) => {
  try {
    const response = await axiosInstance.post(
      `/api/social/follow${followId ? `?followId=${followId}` : ""}`
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Cancel_Follow_API = async (followId?: string | undefined) => {
  try {
    const response = await axiosInstance.delete(
      `/api/social/follow/${followId ? `?followId=${followId}` : ""}`
    );
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const Duplicate_Card_API = async (
  cardId?: number | null,
  tagId?: string | null
) => {
  let url = `/api/cards/copy${cardId ? `?cardId=${cardId}` : ""}${
    tagId ? `&tagId=${tagId}` : ""
  }`;

  try {
    const response = await axiosInstance.post(url);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
