import { request, setAuthToken } from "../../../../../../helper/axios_helper";

export const NotificationService = {
    update: async (payload)  => {
        const response = await request("POST", "/notification/update", payload);
        return response.data;
    },
};