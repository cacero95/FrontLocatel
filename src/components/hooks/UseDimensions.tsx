import { useState, useRef, useEffect } from 'react';

interface Props {
    container : string;
    padding : number;
}

export const UseWidthContainer = ({ container, padding } : Props ) => {
    
    const [ width, setWidth ] = useState( window.innerWidth );
    const containerRef = useRef( document.getElementById( container ));
    
    const updateWidth = () => {
        containerRef.current && setWidth(
            containerRef.current.clientWidth - padding
        );
    }

    useEffect(() => {
        containerRef.current = document.getElementById( container );
        updateWidth();
        window.addEventListener( 'resize', updateWidth )
        return () => window.removeEventListener( 'resize', updateWidth );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return { width }

}

export const UseHeightContainer = ({ container, padding } : Props) => {

    const [ height, setHeight ] = useState( window.innerHeight );
    const containerRef = useRef( document.getElementById( container));
    
    const updateSize = () => {
        if ( containerRef.current ) {
            const value = containerRef.current.clientHeight;
            setHeight( value - padding );
        }
    }

    useEffect(() => {
        containerRef.current = document.getElementById( container );
        updateSize();
        window.addEventListener( 'resize', updateSize )
        return () => window.removeEventListener( 'resize', updateSize );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return { height }
}

export const UseHeightWindow = ( padding : number ) => { 

    const [ height, setHeight ] = useState( window.innerHeight );

    const updateWindow = () => setHeight( window.innerHeight - padding );

    useEffect(() => {
        updateWindow();
        window.addEventListener( 'resize', updateWindow )
        return () => window.removeEventListener( 'resize', updateWindow );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return { height }
}

export const UseContainerHeight = ( container : any, padding : number = 0 ) => {

    const [ content, setContainer ] = useState( document.getElementById( container ));
    const [ height, setHeight ] = useState( content ? content.clientHeight : window.innerHeight );

    const updateContainer = ( component : string ) => {
        setContainer( document.getElementById( component ))
    };

    const updateWindow = () => {
        content && setHeight( content.clientHeight - padding );
    };

    useEffect(() => {
        updateContainer( container );
        updateWindow();
        window.addEventListener( 'resize', updateWindow )
        return () => window.removeEventListener( 'resize', updateWindow );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        updateWindow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ content ]);

    return { height, updateContainer }
}
