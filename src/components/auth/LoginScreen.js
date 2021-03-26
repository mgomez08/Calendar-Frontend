import React from 'react';
import { useDispatch } from 'react-redux';
import validator from 'validator';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail:'',
        lPassword:''
    });
    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: '',
        rEmail:'',
        rPassword1:'',
        rPassword2:'',
    });

    const { lEmail, lPassword } = formLoginValues;
    const {rName, rEmail, rPassword1, rPassword2 } = formRegisterValues

    const handleLogin = ( e ) => {
        e.preventDefault();
        if( !lEmail || !lPassword ){
            return Swal.fire('Error', 'Correo y contraseña son requeridos', 'error')
        }else if( !validator.isEmail(lEmail) ){
            return Swal.fire('Error', 'Debe ingresar un correo válido', 'error')
        }
        dispatch(startLogin(lEmail, lPassword));

    }
    const handleRegister = ( e ) => {
        e.preventDefault();
        if( !rName || !rEmail || !rPassword1 || !rPassword2 ){
            return Swal.fire('Error', 'Todos los campos son obligatorios', 'error')
        }
        else if( !validator.isEmail(rEmail) ){
            return Swal.fire('Error', 'Debe ingresar un correo válido', 'error')
        }
        else if( rPassword1.length <= 5 || rPassword2.length <= 5  ){
            return Swal.fire('Error', 'Las contraseñas deben tener al menos 6 carácteres', 'error')
        }
        else if( rPassword1 !== rPassword2 ){
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
        }
        dispatch(startRegister(rEmail, rPassword1, rName));

    }
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword1"
                                value={rPassword1}
                                onChange={handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}