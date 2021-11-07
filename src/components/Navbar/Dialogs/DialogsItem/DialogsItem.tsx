import React from "react";
import {NavLink} from "react-router-dom";
import s from './DialogsItem.module.css'

type DialogItemProps = {
    id: number
    name: string
}
const DialogItem = (props: DialogItemProps) => {
    return (
        <div className={s.dialog + " " + s.active}>
            <NavLink to={'/dialogs/' + props.id}> {props.name} </NavLink>
        </div>
    )
}


export default DialogItem