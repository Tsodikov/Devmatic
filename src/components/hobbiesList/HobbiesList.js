import { useSelector, useDispatch } from "react-redux"
import { usersSelector, fetchUsers, userUpdate } from "../../store/usersSlice.js";
import { useHttp } from "../../hooks/http.hook.js";
import './hobbieList.scss';


export const HobbiesList = () => {

    const usersList = useSelector(usersSelector);
    const usersLoadingStatus = useSelector(state => state.users.usersLoadingStatus);
    const userIsActive = useSelector(state => state.users.userIsActive);
    const dispatch = useDispatch();
    const { request } = useHttp();
    
    const onDeleteHobbie = (updatedUser, idHobbies) => {
        const newUser = {
            ...updatedUser,
            hobbie: updatedUser.hobbie.filter(item => item.id !== idHobbies)
        }

        request(`http://localhost:3001/users/${updatedUser.id}`, 'PATCH', JSON.stringify(newUser))
            .then(dispatch(userUpdate(newUser)))
            .catch((err) => console.log(err));

            dispatch(fetchUsers());
    }

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

    if (userIsActive) {
        const activeUser = usersList.filter(user => user.id === userIsActive)[0];
        if (activeUser && activeUser.hobbie.length > 0) {
            return (
                <ul className='user-hobbie-list'>
                    {activeUser.hobbie.map(item => {
                        return (
                            <li key={item.id} className='hobbie-str'>
                                <div className='hobbie-str-passion'>Passion: {item.passion}</div>
                                <div className='hobbie-str-hobbie'>{item.hobbie}</div>
                                <div className='hobbie-str-since'>Since: {item.since}</div>
                                <button
                                    className='button-delete'
                                    onClick={() => onDeleteHobbie(activeUser, item.id)}>
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </li>
                        );
                    })}
                    
                </ul>
            )
        } else return null;
    } else return null;
}
