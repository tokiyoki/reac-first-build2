  import { useState, useEffect } from 'react';
  import { useLoad } from '../api/useLoad.js';
  import API, { callFetch } from '../api/API.js';
  import TaskPanels from '../entities/tasks/TaskPanels.js';
  
  /**
   * 
   * @param {*} user can be 'carer' or 'patient' depending on the user type
   */
  function MyTasks({user={type:'patient', userID:1}, mainUser}) {
    //Initialisation
    //needs to be initialised first
    const getEndpoint = (loggedinUserID) => {
      let endpoint = `/tasks/users/notcompleted/${loggedinUserID}`;
      return endpoint;
    }

    //State
    const [tasks, setTasks, loadingMessage, setloadingMessage] = useLoad(getEndpoint(user.userID));

    //Context
    //Methods
    

    const apiCall = async (endpoint) => {
      const response = await API.get(endpoint, 'GET');
      response.isSuccess
        ? setTasks(response.result)
        : response.message === "Error recovering tasks: status code 404"
          ? setTasks([])
          : setloadingMessage(response.message)
    };

    useEffect(() => { apiCall(getEndpoint(user.userID)) } , []);//endpoint

    
    //Listen to task completion
    useEffect(()=>{
      window.addEventListener("taskcompleted", async (event) => {
        apiCall(getEndpoint(user.userID));
      });
    });

    const rerenderTasks = () => {
      apiCall(getEndpoint(user.userID));
    };

    //View
    return(
      <section>
        {
          !tasks
            ? <p>{loadingMessage}</p>
            : <TaskPanels tasks={tasks} loggedUser={user.userID} mainLoggedUser={mainUser.userID} rerenderTasks={rerenderTasks}/>
        }
      </section>
    )
  }

  export default MyTasks;