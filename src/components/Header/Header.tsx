import React from 'react';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";


const Header = ({isAuth, login, ...props}: any) => {
    return <header className={s.header}>
        <div className={s.loginBlock}> {isAuth
            ? <div>
                {login}
        <button onClick={props.logout}>log out</button>
        </div>
            : <NavLink to='/login'>Login</NavLink>}
        </div>
    </header>
}
export default Header
