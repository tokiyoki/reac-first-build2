  import { useState, useEffect } from 'react';
  import { useLoad } from '../api/useLoad.js';
  import { useLocation } from 'react-router-dom';
  import API from '../api/API.js';
  import Menu from '../UI/Menu.js';
  import FormPanels from '../entities/forms/FormPanels.js';
  

  function User({usrMenu = true, loggedUser}) {
    const loggedinUserID = loggedUser.userID;
    const getFormsEndpoint = `/forms/users/${loggedinUserID}`;
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isCreatingForm = searchParams.get('createForm');

    //Properties
    const items = [{text:"Forms", order: 1}];
    //Hooks
    //Context
    const [userMenu, setUserMenu] = useState(usrMenu);
    //const [forms, setForms] = useState(null);
    const [forms, setForms, formsLoadingMessage,] = useLoad(getFormsEndpoint);

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

    //navigate to forms submenu
    useEffect(()=>{
      if(isCreatingForm){
        setUserMenu(false);
      }
    });

    const apiCallGetForms = async (endpoint) => {
      const response = await API.get(endpoint, 'GET');
      if(response.isSuccess){
        setForms(response.result)
      } else {
        setForms([])
      }
    };

    const rerenderForms = async () => {
      console.log("INSIDE RERENDERING");
      await apiCallGetForms(getFormsEndpoint);
    };

    //View
    return(
      <section>
            {
              userMenu 
                ? <Menu heading={"User Profile"} items={items}/>
                : 
                  !forms 
                    ? "Loading..."
                    : <FormPanels forms = {forms} 
                                  newForm = {isCreatingForm ? true : false}
                                  rerenderForms = {rerenderForms}
                                  loggedUser = {loggedUser}>
                      </FormPanels>
            }
      </section>
    )
  }

  export default User;