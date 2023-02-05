import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';
import TaskFormObjectTable from '../../UI/TaskFormObjectTable.js';

export default function TaskPanel({ task, isForm = false }) {
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