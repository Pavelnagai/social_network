import React from 'react';
import styles from "./user.module.css";
import image from "../../assect/images/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png";
import {UserPropsType} from "../../redux/users-reducer";

type UsersPropsType = {
    pageSize: number
    totalUserCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: UserPropsType[]
    follow: (userID: string) => void
    unFollow: (userID: string) => void
}
const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(el => {
                    return <span
                        className={props.currentPage === el ? styles.selectedPage : ''}
                        onClick={() => {
                            props.onPageChanged(el)
                        }}> {el} </span>
                })}
            </div>
            {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : image} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.follow(u.id)
                            }}>follow</button>
                            : <button onClick={() => {
                                props.unFollow(u.id)
                            }}>unFollow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.city'}</div>
                        <div>{'u.location.country'}</div>
                    </span>
                </span>
            </div>)}
        </div>
    );
};

export default Users;