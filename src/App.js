import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import API, { callFetch } from './components/api/API.js';
  
import Layout from './components/layouts/Layout.js';
import MyTasks from './components/pages/MyTasks.js';
import User from './components/pages/User.js';
import SignIn from './components/pages/SignIn.js';
import ContactUs from './components/pages/ContactUs.js';

import PageNotFound from './components/pages/404.js';

import './App.scss';

function App() {
  //Initialisation
  //const initialLoggedinUserID = 1; // 1 user id is patient, 2 user id is carer
  const getUserDependentsEndpoint = "/carerrequests/dependents/";

  //Global state
  const [mainLoggedinUser, setMainLoggedinUser] = useState(null);
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [userDependentIDs, setUserDependentIDs] = useState([]);
  //const [loggedinUserType, setLoggedinUserType] = useState(null);

  //Methods
  const logUserIn = async (user) => {
    //setLoggedinUserID(user.userID);
    //setLoggedinUserType(user.type)
    setMainLoggedinUser(user);
    setLoggedinUser(user);
    getUserDependents(getUserDependentsEndpoint + user.userID);
  };

  const changeUser = async (user) => {
    setLoggedinUser(user);
  };

  const getUserDependents = async (endpoint)=> {
    const response = await API.get(endpoint, 'GET');
      response.isSuccess
        //? setLoggedinUserType(response.result.type)
        ? setUserDependentIDs(response.result)
        : console.log(response.message);
};

  //useEffect(() => { retrieveUserType(getUserEndpoint) } , []);//endpoint
  

  return (
    <BrowserRouter>
      <Layout user={mainLoggedinUser} changeUser={changeUser} userDependentIDs={userDependentIDs} >
        <Routes>
          <Route exact path='/' element={ (loggedinUser) ? <MyTasks user={loggedinUser} /> : <SignIn logUserIn={ logUserIn }/>} />
          <Route path='/user' element={ (loggedinUser) ? <User /> : <SignIn logUserIn={ logUserIn }/>} />
          <Route path='/contactus' element={ (loggedinUser) ? <ContactUs /> : <SignIn logUserIn={ logUserIn }/>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;