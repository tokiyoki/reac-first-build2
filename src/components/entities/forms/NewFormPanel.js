import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import FormObjectTable from '../../UI/FormObjectTable.js';

export default function FormPanel({formDetails, setIsNewTaskForm}) {
    //State
    const [form, setForm] = useState(formDetails);
    /*const [formErrors, setFormErrors] = useState(
        Object.keys(attributes).reduce(
            (accum, key) => ({...accum, [key]: undefined}),
            {}
        )
    );*/

    //Context

    //Methods
    const cancelNewForm = () => {
        setIsNewTaskForm(false);
    };
    //View
    /*const additionalAttributes = [
        {key: 'name', label:'Name'}
      ];*/
  
      return(
        <Panel 
            key={form.formID}
            title={` ${"New form"}`}
            level={1}>
                
            {
                <Panel.Static level={2}>
                    <FormObjectTable 
                        object={form}
                        setIsNewTaskForm={setIsNewTaskForm}
                        /*formErrors= { formErrors }*/ />
                    <button onClick={() => cancelNewForm()}>Cancel</button>
                </Panel.Static>
            }  
        </Panel>
        );
}