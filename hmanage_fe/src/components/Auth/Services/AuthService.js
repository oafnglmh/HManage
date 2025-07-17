import { request, setAuthToken } from "../../../helper/axios_helper";

const login = async (username, password) => {
    const response = await request("POST", "/login", { username, password });
    setAuthToken(response.data.token);
    return response.data;
};

const register = async ({ first_name, last_name, username, password }) => {
    const response = await request("POST", "/register", {
        first_name,
        last_name,
        username,
        password,
    });
    setAuthToken(response.data.token);
    return response.data;
};

export default {
    login,
    register,
};