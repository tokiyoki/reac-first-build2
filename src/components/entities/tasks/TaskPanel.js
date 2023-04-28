import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';
import CompleteTaskInputTable from '../inputs/CompleteTaskInputTable.js';
import API from '../../api/API.js';

export default function TaskPanel({ task, isForm = false, loggedMain, loggedUser, rerenderTasks }) {
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

    /*const rerenderTasks = async () => {
        //send event task completed
        const event = new Event('tasksnumberchanged');
        window.dispatchEvent(event);
    };*/

    //View
    const additionalAttributes = [
        {key: 'description', label:'Description'},
        {key: 'isCompleted', label:'Status'},
        {key: 'formName', label: 'Form'}
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
                    <button onClick={() => removeTask()}>Remove</button>
                    {
                        (loggedMain === loggedUser) ?
                            <button onClick={() => setIsTaskForm(true)}>Complete</button>
                        :""
                    }
                </Panel.Static>
                
                :
                <Panel.Static level={2}>
                    <CompleteTaskInputTable 
                        object={task} 
                        formID={task.formID}
                        setIsTaskForm={setIsTaskForm} 
                        /*formErrors= { formErrors }*/ />
                </Panel.Static>
            }
        </Panel>
        );
}