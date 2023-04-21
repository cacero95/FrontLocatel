import { createContext, useReducer } from "react";
import { UserReducer } from "./UserReducer";

export interface IAccount {
    number : number;
    amount : number;
}

export interface IUser {
    id       ?: string;
    name      : string;
    last_name : string;
    email     : string;
    password  : string;
    isAuth    : boolean;
}

export interface UserState {
    user    : IUser | undefined;
    loading : boolean;
}

export const initUserState : UserState = {
    user      : undefined,
    loading   : false
}

export interface UserPropsContext {
    userState   : UserState;
    loading     : boolean;
    user       ?: IUser;
    setLoading  : ( payload : boolean ) => void;
    setUser     : ( payload : IUser ) => void;
}

export const UserContext = createContext( {} as UserPropsContext );

export const UserProvider = ({ children } : any) => {
    
    const [ userState, dispatch ] = useReducer( UserReducer, initUserState );

    const setLoading = ( payload : boolean ) => {
        dispatch({ type : 'loading', payload })
    }

    const setUser = ( payload : IUser ) => {
        dispatch({ type : 'setUser', payload });
    }

    return (
        <UserContext.Provider
            value = {{
                ...userState,
                userState,
                setLoading,
                setUser
            }}
        >
            { children }
        </UserContext.Provider>
    )
}