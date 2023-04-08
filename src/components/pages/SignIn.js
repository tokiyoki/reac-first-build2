import { NavLink, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import API, { callFetch } from '../api/API.js';

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
    //View
    return(
        <div>
            <h1>Sign In</h1>
            <div>
                <div>Username</div>
                <input id = "username" disabled='disabled'/>
                <div>Password</div>
                <input id = "password" disabled='disabled'/><br/>
                <label>Carer</label>
                <input type='radio' name='type' value='carer'/><br/>
                <label>Patient</label>
                <input type='radio' name='type' value='patient' id="radiopatient" defaultChecked/><br/>
                <button onClick={mockLogin}>Login</button>
            </div>
        </div>
    )
  }

  export default SignIn;