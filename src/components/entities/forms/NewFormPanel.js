import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import ModifyFormInputTable from '../inputs/ModifyFormInputTable.js';

export default function NewFormPanel({formDetails, setIsNewTaskForm, rerenderForms, loggedUser}) {
    //State
    const [form, setForm] = useState(formDetails);

    //Context

    //Methods
    const cancelNewForm = () => {
        setIsNewTaskForm(false);
    };
    //View
  
      return(
        <Panel 
            key={form.formID}
            title={` ${"New form"}`}
            level={1}
            isOpen={true}>
                
            {
                <Panel.Static level={2}>
                    <ModifyFormInputTable 
                        object={form}
                        setIsNewTaskForm={setIsNewTaskForm}
                        /*formErrors= { formErrors }*/ 
                        rerenderForms={rerenderForms}
                        loggedUser={loggedUser}/>
                    <button onClick={() => cancelNewForm()}>Cancel</button>
                </Panel.Static>
            }  
        </Panel>
        );
}