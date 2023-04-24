import React, { FC, useRef } from 'react'
import { UseDollarField } from '../../hooks/UseTextField';
import { Button } from '@mui/material';
import { addFounds } from '../../../api/AccountRequest/AccountRequest';

interface Props {
    number          : number;
    handleRequest   : ( status : boolean ) => void;
}

export const SendMoney :FC<Props> = ({ number, handleRequest }) => {

    const amountRef = useRef(0);

    const handleAmount = ( value : number, name : string ) => {
        if ( Number.isInteger( value ) ) {
            amountRef.current = value;
            return { status : false, message : '' };
        }
        amountRef.current = -1;
        return { status : true, message : "El valor no es numérico" }
    }

    const sendMoney = async () => {
        if ( amountRef.current > -1 ) {
            const out : any = await addFounds({
                number, amount: amountRef.current
            });
            handleRequest( out.status && out.status === true );
        }
    }

    return (
        <div className = "SendMoney">
            <UseDollarField
                name = "amount"
                label = "Monto"
                trigger = { handleAmount }
            />
            <div className = "AmountActions">
                <Button
                    variant = "contained"
                    color = "primary"
                    onClick = { sendMoney }
                >
                    Enviar
                </Button>
            </div>
        </div>
    )
}
