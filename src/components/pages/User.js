  import { useState, useEffect } from 'react';
  import { useLocation } from 'react-router-dom';
  import API from '../api/API.js';
  import Menu from '../UI/Menu.js';
  import FormPanels from '../entities/forms/FormPanels.js';
  

  function User(usrMenu = true) {
    const loggedinUserID = 1;
    const getFormsEndpoint = `/forms/users/${loggedinUserID}`;

    //Properties
    const items = [{text:"Forms", order: 1}];
    //Hooks
    //Context
    const [userMenu, setUserMenu] = useState(usrMenu);
    const location = useLocation();
    const [forms, setForms] = useState(null);
    //Methods
    //Listen to task completion
    useEffect(()=>{
      window.addEventListener("formMenuItemChosen", (event) => {
        setUserMenu(false);
      });
    });

    //reset values when the user page is navigated to
    useEffect(() => {
      if (location.pathname === '/user') {
          setUserMenu(true);
      }
    }, [location]);

    const apiCallGetForms = async (endpoint) => {
      const response = await API.get(endpoint, 'GET');
      if(response.isSuccess){
        setForms(response.result)
      }
    };

    //listen to events that change number of forms]
    useEffect(()=>{
      window.addEventListener("formsnumberchanged", (event) => {
        apiCallGetForms(getFormsEndpoint);
      });
    });

    //get initial list of forms
    useEffect(() => { apiCallGetForms(getFormsEndpoint) }, []);

    //View
    return(
      <section>
            {
              userMenu 
                ? <Menu heading={"User Profile"} items={items}/>
                : <FormPanels forms = {forms}></FormPanels>
            }
      </section>
    )
  }

  export default User;