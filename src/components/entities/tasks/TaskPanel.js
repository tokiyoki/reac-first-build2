import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';

export default function TaskPanel({ task, isForm = false }) {
    //State
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
                <Panel.Static level={2}>
                    <ObjectTable 
                        object={task} 
                        formID={task.formID} 
                        attributes={additionalAttributes} />
                </Panel.Static>
        </Panel>
        );
}