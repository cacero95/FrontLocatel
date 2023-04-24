import { useContext, useEffect, useState } from "react"
import { IAccount, UserContext } from "../../context/UserContext";
import { getAccount } from "../../api/AccountRequest/AccountRequest";
import creditcard from "../../assets/img/creditcard.png";
import AddIcon from '@mui/icons-material/Add';
import { Button, Card, CardContent, Fab, Typography } from "@mui/material";
import { UseDialog } from "../hooks/UseDialog";
import { CreateAccount } from "../Atoms/Home/CreateAccount";
import { SendMoney } from "../Atoms/Home/SendMoney";
import { GetMoney } from "../Atoms/Home/GetMoney";

type TypeAction = "addFound" | "takeOut";

export const Home = () => {

    const { user, setLoading, setMssContent } = useContext( UserContext );
    const [ accounts, setData ] = useState<IAccount[]>([]);
    const [ dialogCreate, setCreate ] = useState( false );
    const [{ dialogSend, sendNumber }, setSend ] = useState({
        dialogSend : false, sendNumber : -1
    });
    const [{ dialogGet, getNumber }, setGet ] = useState({
        dialogGet : false, getNumber : -1
    });

    const requestAccounts = async () => {
        if ( user ) {
            setLoading( true );
            const out : any = await getAccount( user.email );
            setLoading( false );
            out.status && setData( out.accounts );
        }
    }

    const handleAccout = ( number : number, typeRequest : TypeAction ) => {
        typeRequest === "addFound" ? setSend ({
            dialogSend : true, sendNumber : number
        }) : setGet({ dialogGet : true, getNumber : number })
    }

    const handleRequest = ( status : boolean ) => {
        dialogSend === true
            ? setSend({ sendNumber : -1, dialogSend : false })
            : setGet({ getNumber : -1, dialogGet : false });
        if ( status === true ) {
            requestAccounts();
            setMssContent({ activate : true, content : 'Exito!', color : 'green' });
        } else {
            setMssContent({ activate : true, content : 'Problemas de conexión', color : 'red' });
        }
    }

    const handleClose = () =>  {
        setCreate( false );
        requestAccounts();
    }

    useEffect(() => {
        requestAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className = "HomeContainer">
            <UseDialog
                title = "Consignar"
                open = { dialogSend }
                component = {
                    <SendMoney
                        number = { sendNumber }
                        handleRequest = { handleRequest }
                    />
                }
                handleClose = { () => '' }
            />
            <UseDialog
                title = "Consignar"
                open = { dialogGet }
                component = {
                    <GetMoney 
                        number = { getNumber }
                        handleRequest = { handleRequest }
                    />
                }
                handleClose = { () => '' }
            />
            <UseDialog
                title = "Crear Cuenta"
                open = { dialogCreate }
                component = {
                    <CreateAccount
                        onClose = { handleClose }
                        createProps = {{
                            amount : 0,
                            number : accounts.length + 1,
                            user   : user!.id!
                        }}
                    />
                }
                handleClose = { () => '' }
            />

            <div className = "AccountsContainer">
                {
                    accounts.map(({ amount, number }, index ) => (
                        <div className = "CardCredit" key = { index }>
                            <div className = "BasicInfo">
                                <img src = { creditcard } alt = "credit card" />
                                <Card sx = {{ minWidth : 275 }}>
                                    <CardContent>
                                        <Typography>
                                            Cuenta { index + 1 }
                                        </Typography>
                                        <Typography variant = "h5" component = "div">
                                            { amount }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className = "Actions">
                                <Button
                                    color = "success"
                                    variant = "contained"
                                    onClick  = { () =>  handleAccout( number, "addFound" ) }
                                >
                                    Consignar
                                </Button>
                                <Button
                                    color = "warning"
                                    variant = "contained"
                                    onClick  = { () => handleAccout( number, "takeOut" ) }
                                >
                                    Retirar
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                user &&
                    <div className = "createAccount">
                        <Fab
                            color = "primary"
                            onClick = { () => setCreate( true ) } 
                            aria-label = "add"
                        >
                            <AddIcon />
                        </Fab>
                    </div>
            }
        </div>
    )
}