import React, { useState } from 'react'
import './Auth.css'
import Register from '../register/Register'
import Login from '../login/Login'

export default function Auth() {
    const [isClicked, setIsClicked] = useState("register");
    const registerHandle = () => {
        setIsClicked("register");
    }
    const loginHandle = () => {
        setIsClicked("login");
    }
    return (
        <div className='auth-wrapper'>
            <div className='auth-form'>
                <div className='auth-navigation'>
                    <div className='register-navigation' onClick={registerHandle} style={{ backgroundColor: isClicked === "register"? "#F23E4D" : "rgba(242, 62, 77, 0.57)", fontWeight: isClicked === "register"? 700 : 300 }}>
                        REGISTER
                    </div>
                    <div className='login-navigation' onClick={loginHandle} style={{ backgroundColor: isClicked === "login"? "#F23E4D" : "rgba(242, 62, 77, 0.57)", fontWeight: isClicked === "login"? 700 : 300 }}>
                        LOG IN
                    </div>
                </div>
                <div className='foods-icon'>
                    <img  src='../../../public/assets/images/Food.png' alt="dumplings"/>
                </div>
                {
                    isClicked === "register" ? (
                        <Register/>
                    ) : (
                        <Login/>
                    )
                }
            </div>
        </div>
    )
}
