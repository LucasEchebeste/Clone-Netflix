import React from "react";
import '../components/Header.css';
import logo from '../images/logo.png';
import user from '../images/user.png';

export default ({ black }) => {
    return (
        <header className={black? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="Netflix" />
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={user} alt="Usuário"/>
                </a>
            </div>
        </header>
    );
};