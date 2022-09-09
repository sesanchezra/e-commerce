import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './FormLogin.css'

const defaultValue = {
    email: '',
    password: '',
}

const FormLogin = () => {

    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    const login = (data) => {
        const url = `https://ecommerce-api-react.herokuapp.com/api/v1/users/login`
        const userLogin = data;
        axios.post(url, userLogin)
            .then(res => {
                localStorage.setItem('token', res.data.data.token)
                navigate('/')
            }) //Acá me devuelve el token
            .catch(error => console.log(error))

        reset(defaultValue)
    }

    //

    const logout = () =>{
        localStorage.removeItem('token')
        navigate('/')
    }


    return (
        <>
            {
                localStorage.getItem('token') ?
                    // <ModalLogin
                    //     user={user}
                    // />
                    <div>
                        <h2>You are logged</h2>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </div>


                    // <h2>Logged</h2>
                    :
                    <form action="" onSubmit={handleSubmit(login)} className='FormLogin'>
                        <h2>Welcome 👋 ! Please Login</h2>
                        <div className='formlogin__email'>
                            <label htmlFor="email">Email</label>
                            <input type="text"  {...register('email')} className='formlogin__email__input' />
                        </div>
                        <div className='formlogin__password'>
                            <label htmlFor="password">password</label>
                            <input type="password"  {...register('password')} className='formlogin__password__input' />
                        </div>

                        <button className='formlogin__button'>
                            Log in
                        </button>
                    </form>
            }
        </>


    )
}

export default FormLogin
