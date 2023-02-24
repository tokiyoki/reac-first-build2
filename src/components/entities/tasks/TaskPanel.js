import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';
import TaskFormObjectTable from '../../UI/TaskFormObjectTable.js';
import API from '../../api/API.js';

export default function TaskPanel({ task, isForm = false }) {
    //Initialisation
    const removeTaskEndpoint = '/tasks/' + task.taskID;
    //State
    const [isTaskForm, setIsTaskForm] = useState(isForm);
    /*const [formErrors, setFormErrors] = useState(
        Object.keys(attributes).reduce(
            (accum, key) => ({...accum, [key]: undefined}),
            {}
        )
    );*/

    //Context
    //Methods
    const removeTask = async () => {
        await apiCallDeleteTaskDetails(removeTaskEndpoint);

        rerenderTasks();
    };

    const apiCallDeleteTaskDetails = async (endpoint) => {
        const response = await API.delete(endpoint, {});
        console.log(response);
    };

    const rerenderTasks = async () => {
        //send event task completed
        const event = new Event('tasksnumberchanged');
        window.dispatchEvent(event);
    };

    //View
    const additionalAttributes = [
        {key: 'description', label:'Description'},
        {key: 'isCompleted', label:'Status'},
        {key: 'name', label: 'Form'}
      ];
  
      return(
        <Panel 
            key={task.taskID}
            title={` ${task.name} (${task.taskTime})`}
            level={1}>
                
            {
                !isTaskForm ?
                <Panel.Static level={2}>
                    <ObjectTable 
                        object={task} 
                        attributes={additionalAttributes} />
                    <button onClick={() => setIsTaskForm(true)}>Complete</button>
                    <button onClick={() => removeTask()}>Remove</button>
                </Panel.Static>
                
                :
                <Panel.Static level={2}>
                    <TaskFormObjectTable 
                        object={task} 
                        formID={task.formID} 
                        /*formErrors= { formErrors }*/ />
                    <button onClick={() => setIsTaskForm(false)}>Back</button>
                </Panel.Static>
            }
        </Panel>
        );
}