import { request, setAuthToken } from "../../../../../helper/axios_helper";

export const SocialService = {
    getAll: async (page = 0, size = 10) => {
        const response = await request("GET", `/social?page=${page}&size=${size}`, {});
        return response.data;
    },


    add: async (questionPayload) => {
        const response = await request("POST", "/question/add", questionPayload);
        return response.data;
    },
    getById: async (id) => {
        const response = await request("GET", `/social/${id}`,{});
        return response.data;
    },
    update: async (payload)  => {
        const response = await request("POST", "/question/update", payload);
        return response.data;
    },
    like : async  (id) =>{
        const response = await request("POST",`/project/like/${id}`,{});
        return response.data
    },
    comment: async(data) =>{
        const response = await request("POST","/project/add/comment",data);
        return response.data
    }
};