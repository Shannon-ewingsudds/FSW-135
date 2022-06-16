
import React, { useState, useContext } from 'react';
import AuthForm from './AuthForm';
import { UserContext } from '../context/UserProvider.js';

const initInputs = { username: '', password: '' };

function Auth(){
    const [inputs, setInputs] = useState(initInputs);
    const [toggle, setToggle] = useState(false);

    const { signup, login } = useContext(UserContext);

    function handleChange(e){
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    };

    function handleSignup(e){
        e.preventDefault();
        signup(inputs);
    };

    function handleLogin(e){
        e.preventDefault();
        login(inputs);
    };

    return(
        <div className = 'auth-container'>
            <h1>Climate Action 101</h1>
            { !toggle ?
                <>
                    <AuthForm
                        handleChange = {handleChange}
                        handleSubmit = {handleSignup}
                        inputs = {inputs}
                        btnText = 'Sign Up' />
                    <p onClick = {() => setToggle((prev) => !prev)}>Already a member?</p>
                </>
            :
                <>
                    <AuthForm
                        handleChange = {handleChange}
                        handleSubmit = {handleLogin}
                        inputs = {inputs}
                        btnText = 'Login' />
                    <p onClick = {() => setToggle((prev) => !prev)}>Not a member?</p>
                </>
            }
        </div>
    )
};

export default Auth;

   