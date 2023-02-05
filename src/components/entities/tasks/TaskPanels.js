import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';
import FormObjectTable from '../../UI/TaskFormObjectTable.js';
import TaskPanel from './TaskPanel.js';

export default function TaskPanels({ tasks }) {
    //Initialisation
    /*const [formErrors, setFormErrors] = useState(
        Object.keys(attributes).reduce(
            (accum, key) => ({...accum, [key]: undefined}),
            {}
        )
    );*/

    //Context

    //Methods
    //View
      return(
        <Panel.Container>
            {
                tasks.map((task) => 
                <TaskPanel
                    key = {task.taskID}
                    task = {task}/>
                )
            }
        </Panel.Container>
      );
}