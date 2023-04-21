import { FC, useEffect, useRef } from "react";
import { Typography } from "@mui/material"
import { LinearLoading } from "../../../templates/LinearLoading";
import { createAccount, createAccountProps } from "../../../api/AccountRequest/AccountRequest";

interface Props {
    onClose     : () => any;
    createProps : createAccountProps
}

export const CreateAccount : FC<Props> = ({ onClose, createProps }) => {

    const countRef = useRef( 0 );

    const addAccount = async () => {
        const out = await createAccount( createProps );
        console.log( out );
        onClose();
    }

    useEffect(() => {
        countRef.current === 0 && addAccount();
        countRef.current = 1;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className = "acountCreate">
            <Typography variant = "h5">
                Por favor espere se está creando la cuenta
            </Typography>
            <LinearLoading />
        </div>
    )
}