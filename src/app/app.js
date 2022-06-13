import React from 'react';
import { UserList } from '../components/usersList/userList.js';
import { AddUser } from '../components/addUsers/AddUser.js'
import { HobbiesList } from '../components/hobbiesList/HobbiesList.js';
import { AddHobbie } from '../components/addHobbie/AddHobbie.js';
import { useSelector } from 'react-redux';
import { usersSelector } from '../store/usersSlice.js';
import './App.scss';

function App() {

const usersList = useSelector(usersSelector);
const lengthResizeLine = `${(usersList.length * 75) + 53}px`;

  return (
    <div className='App'>
      <div className="container">
            <h1 className="header" >User Hobbie</h1>
            <div className="column">
                <div className="column-left" style={{height: lengthResizeLine}}>
                    <div className="resize-bar"></div>
                    <div className="resize-line"></div>
                    <div className="resize-save">
                        <AddUser/>
                        <UserList />
                    </div> 
                </div>
                <div className="column-right" style={{height: lengthResizeLine}}>
                    <AddHobbie />
                    <HobbiesList />
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;