import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import Service from '../service'

const SignInPage = () => {
    const [form, setForm] = useState({
        userId: '',
        password: ''
    });
    const history = useHistory();

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await Service.signIn(form.userId, form.password)

        localStorage.setItem('token', resp)
        localStorage.setItem('userName', form.userId)
        history.push('/todo')
    }

    const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setForm(prev=>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div id="signInPage">
            <div className="container">
                <form onSubmit={signIn}>
                    <label htmlFor="user_id">
                        <input
                            id="user_id"
                            name="userId"
                            placeholder="Username"
                            value={form.userId}
                            onChange={onChangeField}
                        />
                    </label>
                    <br/>
                    <label htmlFor="password" >
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={onChangeField}
                        />
                    </label>
                    <br />
                    <button className="loginBtn" type="submit">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;
