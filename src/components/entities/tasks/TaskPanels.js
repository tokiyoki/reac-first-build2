import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';

export default function TaskPanels({ tasks }) {
    //Initialisation
    //State
    //Context
    //Methods
    //View
    const additionalAttributes = [
        {key: 'description', label:'Description'},
        {key: 'isCompleted', label:'Status'},
        {key: 'name', label: 'Form'}
      ];
  
      return(
        <Panel.Container>
            {
                tasks.map((task) => 
                <Panel 
                    key={task.taskID}
                    title={` ${task.name} (${task.taskTime})`}
                    level={1}>
                    <Panel.Static level={2}>
                    <ObjectTable 
                        object={task} 
                        attributes={additionalAttributes} />
                    </Panel.Static>
                </Panel>
                )
            }
        </Panel.Container>
      );
}