import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import API, { callFetch } from '../api/API.js';

import './Header.css'

function Header({user, changeUser, userDependentIDs=[]}) {
    //Properties
    const getUserEndpoint = "/users/";
    //Hooks
    //context
    //Methods
    const retrieveUser = async (endpoint) => {
        const response = await API.get(endpoint, 'GET');
          response.isSuccess
            //? setLoggedinUserType(response.result.type)
            ? changeUser(response.result[0])
            : console.log(response.message);
      };

    const swapUser = async (event) => {
        console.log(event.target.value);
        
        await retrieveUser(getUserEndpoint + event.target.value);
    };

    console.log(userDependentIDs);

    //View
    return (
        <header>
            <Link to="/">
                <img src = ""/>
            </Link>
            <Link to="/">
                <h1>Diabetes Management System</h1>
            </Link>
            {
                !user || user.type == 'patient' ?
                <div className='login'>
                    <p>Welcome!</p>
                </div>
                :
                <div className='login'>
                    <p id = "accountLabel">Account</p>
                    <select id = "accountSelect" onChange={ event => swapUser(event) } 
                            defaultValue={user.userID}>
                        <option key={"account"+user.userID} 
                                        value={user.userID} 
                                        >{user.userID}</option>
                        {
                            userDependentIDs.map((userDependentID)=>{
                                return (<option key={"account"+userDependentID.patientID} 
                                        value={userDependentID.patientID} 
                                        >{userDependentID.patientID}</option>
                                )
                            })
                        }
                    </select>
                </div>
            }
        </header>
    )
}

export default Header;