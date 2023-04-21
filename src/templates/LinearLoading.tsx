import { useEffect, useRef, useState } from "react";
import { Box, LinearProgress, Slide } from "@mui/material";
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';

export const LinearLoading = () => {

    const [ load, setLoad ] = useState( true );
    const eventRef = useRef<any>();

    console.log( load );
    useEffect(() => {
        eventRef.current = setInterval(() => {
            setLoad( actual => !actual )
        }, 2000);
        return () => {
            eventRef.current && clearInterval( eventRef.current );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className = "ModalLoading">
            <Slide
                direction="left"
                timeout = { 2000 }
                in = { load }
                mountOnEnter unmountOnExit
            >
                <AirlineSeatReclineExtraIcon fontSize = "large" className = "loadingButton" color = "primary" />
            </Slide>
            <Box sx = {{ width: '100%' }}>
                <LinearProgress />
            </Box>
        </div>
    )
}