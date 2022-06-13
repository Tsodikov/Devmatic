/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook.js";
import { usersSelector, fetchUsers, setUserIsActive, usersDeleted } from "../../store/usersSlice.js";
import React, { useCallback } from "react";
import './userList.scss';


export const UserList = () => {

    const usersList = useSelector(usersSelector);
    const usersLoadingStatus = useSelector(state => state.users.usersLoadingStatus);
    const userIsActive = useSelector(state => state.users.userIsActive);
    const dispatch = useDispatch();
    const { request } = useHttp();
    
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const onChoice = (id) => {
        dispatch(setUserIsActive(id));
    }

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/users/${id}`, 'DELETE', )
            .then(dispatch(usersDeleted(id)))
            .catch((err) => console.log(err))
    }, [request])

    if (usersLoadingStatus === 'loading') {
        return (
                <h5>Loading...</h5>
            )
    } else {
        if (usersLoadingStatus === 'error') {
            return (
                <h5>Error download</h5>
            )
        }
    }

    return (       
        <ul className='user-name-list'>
            {usersList.map(item => {
                return (
                    <li className={userIsActive === item.id? 'list-str-active' : 'list-str'} 
                        key={item.id}
                        onClick={(e) => onChoice(item.id)}>
                            <div className="user-name">
                                {item.name}
                            </div>
                            <button
                                type="button"
                                value="id"
                                className="button-delete"
                                aria-label="Close"
                                onClick={() => onDelete(item.id)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                    </li>)
            })}
        </ul>
    )
};