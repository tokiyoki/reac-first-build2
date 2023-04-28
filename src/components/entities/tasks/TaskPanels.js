import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import TaskPanel from './TaskPanel.js';
import NewTaskPanel from './NewTaskPanel.js';
import './TaskPanels.scss';

export default function TaskPanels({ newTask = false, tasks, loggedUser, mainLoggedUser, rerenderTasks }) {
    //Initialisation
    /*const [formErrors, setFormErrors] = useState(
        Object.keys(attributes).reduce(
            (accum, key) => ({...accum, [key]: undefined}),
            {}
        )
    );*/

    //Context
    const [isNewTaskPanel, setIsNewTaskPanel] = useState(newTask);

    //Methods
    const setIsNewTask = (isNewTask) => {
        setIsNewTaskPanel(isNewTask);
    };

    //View
      return(
        <div className='taskPanelsContainer'>
            <Panel.Container>
                <div className = "headingAndButtons">
                    <h1 className = "left">My tasks</h1>
                    <button className = "right" id = "newTaskButton" onClick={() => setIsNewTaskPanel(true)}>+ New</button>
                </div>
                {
                    isNewTaskPanel 
                        ? 
                            <div>
                                <NewTaskPanel 
                                    setIsNewTaskPanel = {setIsNewTask}
                                    loggedUser = {loggedUser}
                                    rerenderTasks = {rerenderTasks}/>
                            </div>
                        :""
                }
                {
                    tasks.map((task) => 
                    <TaskPanel
                        key = {task.taskID}
                        task = {task}
                        loggedMain ={mainLoggedUser}
                        loggedUser ={loggedUser}
                        rerenderTasks = {rerenderTasks}/>
                    )
                }
            </Panel.Container>
        </div>
      );
}