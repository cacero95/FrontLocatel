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

export interface IMssFooter {
    activate : boolean;
    content  : any;
    color    : string;
}

export interface UserState {
    user        : IUser | undefined;
    loading     : boolean;
    mssFooter   : IMssFooter;
}

export const initUserState : UserState = {
    user      : undefined,
    loading   : false,
    mssFooter : {
        activate : false, content : '', color : "red"
    }   
}

export interface UserPropsContext {
    userState        : UserState;
    loading          : boolean;
    mssFooter        : IMssFooter;
    user            ?: IUser;
    setLoading       : ( payload : boolean ) => void;
    setUser          : ( payload : IUser ) => void;
    setMssContent    : ( payload : IMssFooter ) => void;
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
    
    const setMssContent =  ( payload : IMssFooter ) => {
        dispatch({ type : 'setMssContent', payload })
    }

    return (
        <UserContext.Provider
            value = {{
                ...userState,
                userState,
                setLoading,
                setUser,
                setMssContent
            }}
        >
            { children }
        </UserContext.Provider>
    )
}