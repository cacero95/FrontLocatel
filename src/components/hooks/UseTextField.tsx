import { useState, useEffect } from 'react';
import { TextareaAutosize, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Typography } from '@mui/material';

export interface HeadsErrors {
    status : boolean; message : string;
}

export const formatToDollar = ( value : string ) => {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const validateEmail = ( email : string ) => (
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test( email )
);

interface PropsStyles {
    className ?: string;
}

interface Props extends PropsStyles {
    init        ?: any;
    trigger     ?: ( value : any, name : string ) => HeadsErrors;
    name         : string;
    label        : string;
    placeholder ?: string;
    isError     ?: boolean;
    error       ?: string;
    type        ?: string; // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
    required    ?: any;
    fontSize    ?: number;
    disabled    ?: boolean;
    multiline   ?: boolean;
    size        ?: 'small' | 'medium';
    symbol      ?: string;
}

export const UseTextField = (
    {
        init, name, label, placeholder, className,
        disabled, multiline,
        trigger, isError, error, type, size, symbol, ...rest
    } : Props
) => {

    const [{ value, status, message }, setValue ] = useState({
        value : init || '',
        status : isError || false,
        message: error || ''
    });

    useEffect(() => {
        if ( init ) {
            setValue({ value: init, status, message })
            let val = type === 'number' ? parseInt(init) : init;
            if (type === 'numberWithDecimal') {
                val = type === 'numberWithDecimal' ? parseFloat(init) : init;
            }
            
            trigger && trigger(
                val,
                name
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ init ]);

    return (
        <TextField
            className  = { className || "DefaultStyles" }
            key = { name }
            size = { size || "medium" }
            type = { type || 'text' }
            name = { name }
            multiline = { multiline || false }
            value = { value }
            disabled = { disabled || false }
            label = {
                <div>
                    <span>
                        { label }
                    </span>
                    {
                        rest.required && (
                            <span className = "CustomTextFieldRequired">
                                {`*`}
                            </span>
                        )
                    }
                </div>
            }
            error = { status }
            sx = {{ width: '100%' }}
            placeholder = { placeholder || '' }
            InputProps = {{
                style: { fontSize: rest.fontSize || 15 },
                startAdornment: symbol && (<InputAdornment position="start">{symbol}</InputAdornment>),
            }}
            helperText = { message }
            onChange = {
                ({ target }) => {
                    if ( trigger ) {
                        const transform: any = target.value;
                        const tempValue = ( type === 'number' || type === 'numberWithDecimal')
                            && isNaN( transform ) ? 0 : target.value;
                        const out = trigger(
                            tempValue, target.name
                        )
                        setValue({
                            status: out.status,
                            message: out.message,
                            value: tempValue
                        });
                    } else {
                        setValue({
                            status, message, value: target.value
                        })
                    }
                }
            }
        />
    )
}

export const UseDollarField = (
    {
        init, name, label, placeholder, className,
        disabled, size,
        trigger, isError, error, type, ...rest
    } : Props
) => {
    
    const initState = ( initValue : any ) => {
        if ( initValue ) {
            const out = parseInt( `${ initValue }` );
            return {
                status  : isError || false,
                message : error || '',
                value   : formatToDollar( `${ out }` )
            }
        }
        return {
            status  : isError || false,
            message : error || '',
            value   : '',
        }
    }

    const [{ value, status, message }, setValue ] = useState( initState( init ));

    useEffect(() => {
        if ( init ) {
            setValue( initState( init ));
            trigger && trigger( parseInt( init ), name );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ init ]);

    return (
        <>
            <FormControl fullWidth>
                <InputLabel>
                    { label }
                    { rest.required && <span className = "CustomTextFieldRequired">{`*`}</span> }
                </InputLabel>
                <OutlinedInput
                    value = { value }
                    label = { label }
                    size = { size || "medium" }
                    color = { status ? 'error' : 'primary' }
                    error = { status }
                    name = { name }
                    startAdornment = {
                        <InputAdornment position = "start">$</InputAdornment>
                    }
                    onChange = {
                        ({ target }) => {
                            const transform : any = target.value.replace( /,/g, '' ).replace( '.', '' );
                            if ( !isNaN( transform ) ) {
                                const updateValue = parseInt( transform )
                                const out = trigger ? trigger(
                                    updateValue, target.name
                                ) : {
                                    message : '', status : false
                                }
                                setValue({
                                    status : out.status,
                                    message : out.message,
                                    value : formatToDollar( transform )
                                })
                            }
                        }
                    }
                />
            </FormControl>
            {
                status &&
                    <Typography color = "red">
                        { message }
                    </Typography>
            }
        </>
    )
}

export const UseTextArea = (
    {
        init, name, label, placeholder, className,
        disabled,
        trigger, isError, error, type, ...rest
    } : Props
) => {
    const [{ value, status, message }, setValue ] = useState({
        value : init || '',
        status : isError || false,
        message: error || ''
    });

    useEffect(() => {
        if ( init ) {
            setValue({ value: init, status, message })
            let val = type === 'number' ? parseInt(init) : init;
            if (type === 'numberWithDecimal') {
                val = type === 'numberWithDecimal' ? parseFloat(init) : init;
            }
            trigger && trigger(
                val,
                name
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ init ]);
    
    return (
        <TextareaAutosize
            key = { name }
            disabled = { disabled }
            className = "fontArea"
            maxRows = { 4 }
            onChange = {
                ({ target }) => {
                    if ( trigger ) {
                        const out = trigger(
                            target.value, target.name
                        )
                        setValue({
                            status: out.status,
                            message: out.message,
                            value: target.value
                        });
                    } else {
                        setValue({
                            status, message, value: target.value
                        })
                    }
                }
            }
            aria-label = "maximum height"
            placeholder = { label }
            defaultValue = { value }
            style = {{
                width: '100%'
            }}
        />
    )

}