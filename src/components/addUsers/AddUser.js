import { useDispatch } from "react-redux"
import { setUserIsActive, usersCreated } from "../../store/usersSlice";
import { v4 as uuid } from 'uuid';
import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import './addUser.scss';

export const AddUser = () => {

    const [newName, setNewName] = useState('');

    const dispatch = useDispatch();
    const { request } = useHttp();

    const onAddUser = (e) => {
        e.preventDefault();

        const newUser = {
            id: uuid(),
            name: newName,
            hobbie: []
        }

        request('http://localhost:3001/users', 'POST', JSON.stringify(newUser))
            .then(dispatch(usersCreated(newUser)))
            .catch((err) => {
                console.log(err.status)
            });

        dispatch(setUserIsActive(newUser.id));
        setNewName('');       
    }

    return (
        <form className='control-element-container' onSubmit={onAddUser}> 
            <input
                required
                type="text"
                className="input"
                placeholder='Enter user name...'
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                 />
            <button
                type="submit"
                className='add-button'
                // onSubmit={(e) => onAddUser(e)}
                >Add</button>
        </form>
    )
}