import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';
import ModifyTaskInputTable from '../inputs/ModifyTaskInputTable.js';

export default function NewTaskPanel({setIsNewTaskPanel, loggedUser, rerenderTasks}) {
    //State
    //const [isTaskForm, setIsTaskForm] = useState(isForm);
    /*const [formErrors, setFormErrors] = useState(
        Object.keys(attributes).reduce(
            (accum, key) => ({...accum, [key]: undefined}),
            {}
        )
    );*/

    //Context
    let task = {
        taskID: 0,
        name: "New task",
        taskTime: "00:00:00"
    };

    //Methods
    const setIsNewTask = (isNewTask) => {
        setIsNewTaskPanel(isNewTask);
    }
    //View
    const additionalAttributes = [
        {key: 'description', label:'Description', value: '', type: 'text'}
      ];
    
    const formAttribute = [
        {key: 'form', label: 'Form', value:'', type: 'select'}
      ];
  
      return(
        <Panel 
            key={task.taskID}
            title={` ${task.name} (${task.taskTime})`}
            level={1}
            isOpen={true}>
                
            {
                <Panel.Static level={2}>
                    <ModifyTaskInputTable 
                        object={task} 
                        attributes={additionalAttributes}
                        formAttributeInitial={formAttribute}
                        setIsNewTaskPanel={setIsNewTask}
                        loggedUser={loggedUser} 
                        rerenderTasks={rerenderTasks}/>
                </Panel.Static>
            }  
        </Panel>
        );
}