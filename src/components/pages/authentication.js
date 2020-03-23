import React, {useState} from 'react'

//import Components
import { Link } from "react-router-dom";
import axios from 'axios'
import useFetch from "../Hooks/useFetch";

const Authentication = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [{isLoading, error, response}, doFetch] = useFetch('/users/login')

    const handleSubmit = (e) => {
        e.preventDefault()

        doFetch({
            method: 'post',
            data: {
                user: {
                    email: 'nameUser@mail.com',
                    password: '2021'
                }
            }
        })
    }

    return (
        <div className='auth-page'>
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className='text-xs-center'>Login</h1>
                        <p className='text-xs-center'>
                            <Link to='register'>Need an account?</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className='form-group'>
                                    <input
                                        type='email'
                                        className='form-control from-control-light'
                                        placeholder='Email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </fieldset>

                                <fieldset className='form-group'>
                                    <input
                                        type='password'
                                        className='form-control from-control-light'
                                        placeholder='Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </fieldset>
                                <button className='btn btn-lg btn-primary pull-xs-right' type='submit' disabled={isLoading}>
                                    Sign in
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Authentication