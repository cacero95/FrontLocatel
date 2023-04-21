import React, { FC, useRef } from 'react'
import { UseDollarField } from '../../hooks/UseTextField';
import { takeOutAmount } from '../../../api/AccountRequest/AccountRequest';
import { Button } from '@mui/material';

interface Props {
    number : number;
}

export const GetMoney : FC<Props> = ({ number }) => {

    const amountRef = useRef(0);

    const handleAmount = ( value : number, name : string ) => {
        console.log( value, name );
        return { status : false, message : '' };
    }

    const sendMoney = async () => {
        const out = await takeOutAmount({
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
