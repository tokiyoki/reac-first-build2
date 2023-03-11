  import { useState, useEffect } from 'react';
  import { useLoad } from '../api/useLoad.js';
  import API, { callFetch } from '../api/API.js';
  import TaskPanels from '../entities/tasks/TaskPanels.js';
  
  function MyTasks() {
    //Initialisation
    const loggedinUserID = 1;
    const endpoint = `/tasks/users/notcompleted/${loggedinUserID}`;

    //State
    const [tasks, setTasks, loadingMessage, setloadingMessage] = useLoad(endpoint);
    //const [tasks, setTasks] = useState(null);
    //const [loadingMessage, setloadingMessage] = useState('Loading records...');

    //Context
    //Methods
    const apiCall = async (endpoint) => {
      const response = await API.get(endpoint, 'GET');
      response.isSuccess
        ? setTasks(response.result)
        : setloadingMessage(response.message)
    };

    //useEffect(() => { apiCall(endpoint) } , [endpoint]);

    
    //Listen to task completion
    useEffect(()=>{
      window.addEventListener("taskcompleted", (event) => {
        apiCall(endpoint);
      });
    });

    //listen to events that change number of forms]
    useEffect(()=>{
      window.addEventListener("tasksnumberchanged", (event) => {
        apiCall(endpoint);
      });
    });

    console.log(tasks);

    //View
    return(
      <section>
        {
          !tasks
            ? <p>{loadingMessage}</p>
            : tasks.length === 0
              ? <p>No tasks found</p>
              : <TaskPanels tasks={tasks}/>
        }
      </section>
    )
  }

  export default MyTasks;