import { UserState } from "./UserContext";

type UserOptions = {
    type    : 'getUser' | 'setUser' | 'loading' | 'setMssContent';
    payload : any;
}

export const UserReducer = ( state : UserState, { type, payload } : UserOptions ) => {
    switch ( type ) {
        case "getUser":
            return state;
        case "setUser":
            return {
                ...state,
                user    : payload,
                loading : false
            }
        case "loading":
            return {
                ...state,
                loading : payload
            }
        case "setMssContent":
            return {
                ...state,
                mssFooter : payload
            }
        default: return { ...state };
    }
}