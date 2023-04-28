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
    //const initialLoggedinUserID = (user=="patient") ? 1 : 2; // 1 user id is patient, 2 user id is carer
    
    //needs to be initialised first
    const getEndpoint = (loggedinUserID) => {
      let endpoint = `/tasks/users/notcompleted/${loggedinUserID}`;
      return endpoint;
    }

    //State
    const [tasks, setTasks, loadingMessage, setloadingMessage] = useLoad(getEndpoint(user.userID));
    //const [loggedinUserID, setLoggedinUserID] = useState(mainLoggedinUserID);
    //const [tasks, setTasks] = useState(null);
    //const [loadingMessage, setloadingMessage] = useState('Loading records...');

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

    //listen to events that change number of forms]
    /*useEffect(()=>{
      window.addEventListener("tasksnumberchanged", async (event) => {
        
      });
    });*/

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