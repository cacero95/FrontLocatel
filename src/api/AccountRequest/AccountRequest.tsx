import { IAccount } from "../../context/UserContext";
import { reqResApi } from "../reqResApi";

export const getAccount = async ( email : string ) => {
    try {
        const { data } = await reqResApi.post( '/account/getAccount', { email });
        return data;
    } catch {
        return false;
    }
}

export interface createAccountProps extends IAccount {
    user    : string;
}

export const createAccount = async ( props : createAccountProps ) => {
    try {
        const { data } = await reqResApi.post( '/account/', props );
        return data;
    } catch {
        return false
    }
}

interface PropsAccountGet {
    number : number;
    amount : number;
}

export const addFounds = async ( payload : PropsAccountGet ) => {
    try {
        const { data } = await reqResApi.put( '/account/addFounds', payload )
        return data;
    } catch {
        return false;
    }
}
export const takeOutAmount = async ( payload : PropsAccountGet ) => {
    try {
        const { data } = await reqResApi.put( '/account/takeOutAmount', payload )
        return data;
    } catch {
        return false;
    }
}