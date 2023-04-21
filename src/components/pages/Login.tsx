import { FC, useContext, useRef, useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import backgroundImage from '../../assets/img/login-register.jpg';
import { HeadsErrors, UseTextField, validateEmail } from '../hooks/UseTextField';
import { IUser, UserContext } from '../../context/UserContext';
import { LoginRequest, RegisterRequest } from '../../api/UserRequest/UserRequest';
// import logo from '../../assets/img/login-register.jpg';
// import logoText from '../../assets/img/logo-text.png';

interface Action {
    triggerAction : () => void;
}

interface Login extends Action {
    triggerEmail    : ( value : string, name : string ) => HeadsErrors;
    triggerPassword : ( value : string, name : string ) => HeadsErrors;
}

interface Register extends Action {
    triggerEmail    : ( value : string, name : string ) => HeadsErrors;
    triggerPassword : ( value : string, name : string ) => HeadsErrors;
    triggerName     : ( value : string, name : string ) => HeadsErrors;
    triggerLastName : ( value : string, name : string ) => HeadsErrors;
}

const LoginContainer : FC<Login> = ({ triggerEmail, triggerPassword, triggerAction }) => (
    <>
        <div className = "formSection">
            <Alert severity="info">
                <AlertTitle>Inicio de sesión</AlertTitle>
                <strong>Por favor ingrese sus creadenciales</strong>
            </Alert>
        </div>
        <div className = "formSection left_ajust">
            <UseTextField
                name = "email"
                label = "Correo"
                trigger = { triggerEmail }
            />
        </div>
        <div className = "formSection left_ajust">
            <UseTextField
                name = "password"
                label = "Contraseña"
                trigger = {  triggerPassword }
            />
        </div>
        <div className="formSection left_ajust">
            <Button
                variant = "contained"
                color = "primary"
                onClick = { triggerAction }
            >
                Ingresar
            </Button>
        </div>
    </>
);

const RegisterContainer: FC<Register> = ({ triggerEmail, triggerPassword, triggerName, triggerLastName, triggerAction }) => (
    <>
        <div className = "formSection">
            <Alert severity="info">
                <AlertTitle>Inicio de sesión</AlertTitle>
                <strong>Por favor ingrese sus creadenciales</strong>
            </Alert>
        </div>
        <div className = "formSection left_ajust">
            <UseTextField
                name = "name"
                label = "Nombre"
                trigger = { triggerName }
            />
        </div>
        <div className = "formSection left_ajust">
            <UseTextField
                name = "last_name"
                label = "Apellido"
                trigger = { triggerLastName }
            />
        </div>
        <div className = "formSection left_ajust">
            <UseTextField
                name = "email"
                label = "Correo"
                trigger = { triggerEmail }
            />
        </div>
        <div className = "formSection left_ajust">
            <UseTextField
                name = "password"
                label = "Contraseña"
                trigger = { triggerPassword }
            />
        </div>
        <div className="formSection left_ajust">
            <Button
                variant = "contained"
                color = "primary"
                onClick = { triggerAction }
            >
                Ingresar
            </Button>
        </div>
    </>

)

export const LoginComponent = () => {

    const initUser = {
        name        : '',
        last_name   : '',
        email       : '',
        password    : '',
        isAuth      : false
    }
    const [ isLogin, setLogin ] = useState( true );
    const userRef = useRef<IUser>({
        ...initUser
    });
    const { setLoading, setUser } = useContext( UserContext );
    
    const changeValidation = () => {
        userRef.current = { ...initUser };
        setLogin( !isLogin );
    }

    const triggerEmail = ( value : string, name : string ) : HeadsErrors => {
        if ( validateEmail( value ) ) {
            userRef.current.email = value;
            return { status : false, message : '' }
        }
        return { status : true, message : 'Correo invalido' }
    }

    const triggerPassword = ( value : string, name : string ) : HeadsErrors => {
        userRef.current.password = value;
        return { status : false, message : '' }
    }

    const triggerName = ( value : string, name : string ) : HeadsErrors => {
        userRef.current.name = value;
        return { status : false, message : '' }
    }

    const triggerLastName = ( value : string, name : string ) : HeadsErrors => {
        userRef.current.last_name = value;
        return { status : false, message : '' }
    }

    const triggerAction = async () => {
        setLoading( true );
        const out : any = isLogin
            ? await LoginRequest({ email : userRef.current.email, password : userRef.current.password })
            : await RegisterRequest({
                email : userRef.current.email,
                password : userRef.current.password,
                name : userRef.current.name,
                last_name : userRef.current.last_name
            });
        if ( out.status && out.status === true ) {
            setUser({
                id        : out.id,
                email     : out.email,
                last_name : out.last_name,
                name      : out.name,
                password  : out.password,
                isAuth    : true
            })
        } else {
            setLoading( false );
        }
    }

    return (
        <section
            id = "wrapper"
            className = "login-register login-sidebar"
        >
            <div
                className = "backgroundLogin"
                style = {{ 
                    backgroundImage: `url(${backgroundImage})`
                }}
            >
            </div>
            <div className = "formulary">
                <div className = "formContainer">
                    {
                        isLogin
                        ?   <LoginContainer
                                triggerEmail = { triggerEmail }
                                triggerPassword = { triggerPassword }
                                triggerAction = { triggerAction }
                            />
                        :   <RegisterContainer
                                triggerEmail = { triggerEmail }
                                triggerPassword = { triggerPassword }
                                triggerName = { triggerName }
                                triggerLastName = { triggerLastName }
                                triggerAction = { triggerAction }
                            />
                    }
                </div>
                <Alert severity = "warning">
                    <AlertTitle>Atención</AlertTitle>
                    Si tiene una cuenta <strong className = "RegisterChangeButton" onClick = { changeValidation }>Cree una</strong>
                </Alert>
            </div>
        </section>
    )
}