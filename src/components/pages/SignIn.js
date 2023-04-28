import { NavLink, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import API, { callFetch } from '../api/API.js';

import './SignIn.scss';

function SignIn({logUserIn}) {
    //Properties
    const getUserEndpoint = "/users/";
    const navigate = useNavigate();
  
    //Hooks
    //Context
    //Methods
    const retrieveUser = async (endpoint) => {
        const response = await API.get(endpoint, 'GET');
          response.isSuccess
            //? setLoggedinUserType(response.result.type)
            ? logUserIn(response.result[0])
            : console.log(response.message);
      };

    const mockLogin = async () => {
        let newUser;

        //get the radiopatient button
        let radiopatient = document.getElementById("radiopatient");
        
        if(radiopatient.checked){
            newUser = {userID: 1}//default patient
        } else {
            newUser = {userID: 2}//default carer
        }

        await retrieveUser(getUserEndpoint + newUser.userID);

        navigate('/', {replace: true} );
    }

    const changeUsername = (username) => {
        document.getElementById("username").value = username;
    }
    //View
    return(
        <div id = "signInPageContainer">
            <div id="signInMainContainer">
                <h1 id='mainHeading'>Sign In</h1>
                <div>
                    <div>Username</div>
                    <input className='login' id = "username" disabled='disabled' value='1'/>
                    <div>Password</div>
                    <input className='login' id = "password" disabled='disabled'/><br/>
                    <div id = "loginRadioGroup">
                        <label>Carer</label>
                        <input type='radio' name='type' value='carer' onChange={(e)=>{changeUsername(2)}}/><br/>
                        <label>Patient</label>
                        <input type='radio' name='type' value='patient' id="radiopatient" defaultChecked onChange={(e)=>{changeUsername(1)}}/><br/>
                    </div>
                    <button onClick={mockLogin}>Login</button>
                </div>
            </div>
        </div>
    )
  }

  export default SignIn;