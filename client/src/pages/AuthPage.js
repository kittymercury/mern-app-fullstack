import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({ email: '', password: '' })

    useEffect( () => {
        message(error)
        clearError()
    }, [ error, message, clearError ])

    useEffect( () => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Welcome</h2>
                <div className="card deep-purple lighten-1">
                    <div className="card-content white-text">
                        <div className="card-title">Authentication</div>
                        <div>
                        <div className="input-field">
                            <input
                                placeholder="Email"
                                autoComplete='off'
                                id="email"
                                type="text"
                                name="email"
                                value={form.email}
                                className="yellow-input white-text"
                                onChange={changeHandler}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Password"
                                id="password"
                                type="password"
                                name="password"
                                value={form.password}
                                className="yellow-input white-text"
                                onChange={changeHandler}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                        className="btn orange accent-4"
                        disabled={loading}
                        onClick={loginHandler}
                        >
                            Log in
                        </button>
                        <button
                        className="btn grey lighten-1 black-text"
                        onClick={registerHandler}
                        disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}