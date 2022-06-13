import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { fetchUsers, usersSelector, userUpdate } from "../../store/usersSlice";
import { v4 as uuid } from 'uuid';

export const AddHobbie = ()  => {

    const [newPassion, setNewPassion] = useState('');
    const [newHobbie, setNewHobbie] = useState('');
    const [newSince, setNewSince] = useState('');

    const dispatch = useDispatch();
    const { request } = useHttp();
    const usersList = useSelector(usersSelector);
    const userIsActive = useSelector(state => state.users.userIsActive);
    

    const onSubmit = (e, updatedUser) => {
        e.preventDefault();

        const newUser = {
            ...updatedUser,
            hobbie: [...updatedUser.hobbie, {id: uuid(), passion: newPassion, hobbie: newHobbie, since: newSince}]
        }

        request(`http://localhost:3001/users/${updatedUser.id}`, 'PATCH', JSON.stringify(newUser))
            .then(dispatch(userUpdate(newUser)))
            .catch((err) => console.log(err));

        dispatch(fetchUsers());
        setNewPassion('');
        setNewHobbie('');
        setNewSince('');
    }

    if (userIsActive) {
        const activeUser = usersList.filter(user => user.id === userIsActive)[0];
        
        return (
            <form className='control-element-container' onSubmit={(e) => onSubmit(e, activeUser)}> 
                <input
                    required
                    type="text"
                    className="input input-right"
                    placeholder='Select passion level...'
                    key="1"
                    id="passion"
                    value={newPassion}
                    onChange={(e) => {setNewPassion(e.target.value)}}
                    />
                <input
                    required 
                    type="text"
                    className="input input-right"
                    placeholder='Enter user hobbie...'
                    key=""
                    id="hobbie"
                    value={newHobbie}
                    onChange={(e) => {setNewHobbie(e.target.value)}} />
                <input
                    required 
                    type="number"
                    className="input input-right"
                    placeholder='Enter year...'
                    key="3"
                    id="since"
                    value={newSince}
                    onChange={(e) => {setNewSince(e.target.value)}}/>
                <button className='add-button'>Add</button>
            </form>
        )
    } else return (
        <form className='control-element-container'> 
                <input
                    required
                    disabled
                    type="text"
                    className="input input-right"
                    placeholder='Select passion level...'
                    key="1"
                    id="passion"
                    value={newPassion}
                    onChange={(e) => {setNewPassion(e.target.value)}}
                    />
                <input
                    required 
                    disabled
                    type="text"
                    className="input input-right"
                    placeholder='Enter user hobbie...'
                    key=""
                    id="hobbie"
                    value={newHobbie}
                    onChange={(e) => {setNewHobbie(e.target.value)}} />
                <input
                    required 
                    disabled
                    type="number"
                    className="input input-right"
                    placeholder='Enter year...'
                    key="3"
                    id="since"
                    value={newSince}
                    onChange={(e) => {setNewSince(e.target.value)}}/>
                <button className='add-button' disabled>Add</button>
            </form>
    );
}