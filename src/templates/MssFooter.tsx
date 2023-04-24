import { FC, useRef, useEffect, useContext } from 'react';
import { Box, Fade, Popper } from '@mui/material';
import { UserContext } from '../context/UserContext';

interface Props {
    container : any;
    id        : string;
}

export const MssFooter : FC<Props> = ({ container, id }) => {

    const eventRef = useRef<any>();
    const { setMssContent, mssFooter } = useContext( UserContext );

    useEffect(() => {
        if ( mssFooter.activate === true ) {
            eventRef.current = setInterval(() => {
                setMssContent({
                    activate : false, content : '', color : 'red'
                })
            }, 5000 );
        } else {
            eventRef.current && clearInterval( eventRef.current );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ mssFooter.activate ])

    return (
        <Popper
            id = { id }
            open = { mssFooter.activate }
            anchorEl = { container }
            transition
        >
            {({ TransitionProps }) => (
                <Fade { ...TransitionProps } timeout = { 350 }>
                    <Box 
                        color = { mssFooter.color || "red" }
                        sx = {{
                            border: 1,
                            p: 1,
                            bgcolor: 'background.paper',
                            minWidth : 150,
                            textAlign : 'center'
                        }}
                    >
                        { mssFooter.content }
                    </Box>
                </Fade>
            )}
        </Popper>
    )
}

export default MssFooter
