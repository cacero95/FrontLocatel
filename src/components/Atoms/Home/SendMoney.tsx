import React, { FC, useRef } from 'react'
import { UseDollarField } from '../../hooks/UseTextField';
import { Button } from '@mui/material';
import { addFounds } from '../../../api/AccountRequest/AccountRequest';

interface Props {
    number : number;
}

export const SendMoney :FC<Props> = ({ number }) => {

    const amountRef = useRef(0);

    const handleAmount = ( value : number, name : string ) => {
        console.log( value, name );
        return { status : false, message : '' };
    }

    const sendMoney = async () => {
        const out = await addFounds({
            number, amount: amountRef.current
        });
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
                >
                    Enviar
                </Button>
            </div>
        </div>
    )
}
