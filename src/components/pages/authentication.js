import React, {useState, useEffect} from 'react'

import { Link } from "react-router-dom";
import axios from 'axios'

const Authentication = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
    }

    useEffect(() => {
        if (!isSubmitting) return

        axios('https://conduit.productionready.io/api/users/login', {
            method: 'post',
            data: {
                user: {
                    email: 'nameUser@mail.com',
                    password: '2021'
                }
            }
        }).then(res => {
            console.log('success', res)
            setIsSubmitting(false)
        }).catch(e => console.log(e))
    }, [email])

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
                                <button className='btn btn-lg btn-primary pull-xs-right' type='submit' disabled={isSubmitting}>
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