import { request, setAuthToken } from "../../../../../helper/axios_helper";

export const QuestionService = {
    getAll: async () => {
        const response = await request("GET", "/question", {});
        return response.data;
    },

    add: async (questionPayload) => {
        const response = await request("POST", "/question/add", questionPayload);
        return response.data;
    },
    getById: async (id) => {
        const response = await request("GET", `/question/${id}`,{});
        return response.data;
    },
    update: async (payload)  => {
        const response = await request("POST", "/question/update", payload);
        return response.data;
    }
};