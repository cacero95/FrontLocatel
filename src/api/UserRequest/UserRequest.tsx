import { reqResApi } from "../reqResApi";

interface PropsLogin {
    email    : string;
    password : string;
}

export const LoginRequest = async ({ email, password } : PropsLogin) => {
    try {
        const { data } = await reqResApi.post( '/user/login', { email, password });
        return data;
    } catch {
        return false;
    }
}

interface PropsRegister extends PropsLogin {
    name      : string;
    last_name : string;
}

export const RegisterRequest = async ({ name, last_name, email, password } : PropsRegister) => {
    try {
        const { data } = await reqResApi.post( '/user/register', { name, last_name, email, password });
        return data;
    } catch {
        return false;
    }
}