import { FC, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material/';
import { UseContainerHeight } from './UseDimensions';

interface Props {
    open                 : boolean;
    title                : string | any;
    padding             ?: number;
    handleClose          : () => void;
    component            : any;
    className           ?: string;
    closeIcon           ?: boolean;
    titleActions        ?: any;
    unmountaction       ?: any;
    minHeight           ?: number;
    maxHeight           ?: number;
}

export const UseDialog: FC<Props> = (
    {
        open, title, handleClose, component, className,
        closeIcon, unmountaction, titleActions, minHeight = 120,
        padding = 0
    }
) => {

    const { height, updateContainer } = UseContainerHeight( 'ContainerBoxDialog', padding );
    const containerRef = useRef<any>();

    useEffect(() => {
        updateContainer( 'ContainerBoxDialog' )
        return () => unmountaction && unmountaction();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateContainer( 'ContainerBoxDialog' )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ component ]);

    useEffect(() => {
        updateContainer( 'ContainerBoxDialog' )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ padding ]);

    return (
        <Dialog
            open = { open }
            onClose = { handleClose }
            className = { className || 'defaultDialog' }
            aria-labelledby = "alert-dialog-title"
            aria-describedby = "alert-dialog-description"
        >
            <div
                className = "ContainerBoxDialog"
                id = "ContainerBoxDialog"
                ref = { containerRef }
            >
                <div className = "ActionsDialog">
                    {
                        closeIcon && (
                            <div className = "closeIconModal">
                                <Fab color = "error" size = "small" onClick = { handleClose }>
                                    <CloseIcon />
                                </Fab>
                            </div>
                        )
                    }
                </div>
                <DialogTitle className = "ModalContentDialog">
                    { title }
                </DialogTitle>
                <DialogContent>
                    <div style = {{ maxHeight : height, minHeight }}>
                        { component }
                    </div>
                </DialogContent>
                {
                    titleActions && (
                        <div className = "AditionalActions">
                            { titleActions }
                        </div>
                    )
                }
            </div>
        </Dialog>
    )
}

export const UseDialogContainer: FC<Props> = (
    {
        open, title, handleClose, component,
        className, closeIcon, unmountaction,
        maxHeight, titleActions, padding = 0
    }
) => {

    const setAditionalProps = () => {
        let params = {};
        if ( maxHeight ) {
            params = { maxHeight };
        }
        return params;
    }

    useEffect(() => {
        return () => unmountaction && unmountaction();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Dialog
            open = { open }
            onClose = { handleClose }
            className = { className || 'defaultDialog' }
            aria-labelledby = "alert-dialog-title"
            aria-describedby = "alert-dialog-description"
        >
            <div
                className = "ContainerBoxDialog"
                id = "ContainerBoxDialog"
            >
                
                <div className = "ActionsDialog">
                    {
                        closeIcon && (
                            <div className = "closeIconModal">
                                <Fab color = "error" size = "small" onClick = { handleClose }>
                                    <CloseIcon />
                                </Fab>
                            </div>
                        )
                    }
                </div>
                <DialogTitle className = "ModalContentDialog">
                    { title }
                </DialogTitle>
                <DialogContent 
                    className = "ModalDialogContent"
                    sx = {{ ...setAditionalProps(), padding }}
                >
                    <div>
                        { component }
                    </div>
                </DialogContent>
                {
                    titleActions && (
                        <div className = "AditionalActions">
                            { titleActions }
                        </div>
                    )
                }
            </div>
        </Dialog>
    )
}
