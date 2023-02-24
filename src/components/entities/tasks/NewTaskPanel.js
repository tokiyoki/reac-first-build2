import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';
import FormOfTaskObjectTable from '../../UI/FormOfTaskObjectTable.js';

export default function NewTaskPanel({setIsNewTaskPanel}) {
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
        {key: 'description', label:'Description', value: ''},
        {key: 'isCompleted', label:'Status', value: false},
        {key: 'form', label: 'Form', value:''}
      ];
  
      return(
        <Panel 
            key={task.taskID}
            title={` ${task.name} (${task.taskTime})`}
            level={1}>
                
            {
                <Panel.Static level={2}>
                    <FormOfTaskObjectTable 
                        object={task} 
                        attributes={additionalAttributes}
                        setIsNewTaskPanel={setIsNewTask} />
                </Panel.Static>
            }  
        </Panel>
        );
}