import { request, setAuthToken } from "../../../../../helper/axios_helper";

export const UserService = {
    getById: async (id) => {
        const response = await request("GET", `/user/${id}`,{});
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