import { useState } from 'react';
import Panel from '../../UI/Panel.js';
import FormPanel from './FormPanel.js';
import NewFormPanel from './NewFormPanel.js';
import './FormPanels.scss';

export default function FormPanels({newForm = false, forms, rerenderForms, loggedUser }) {
    //Initialisation

    //Context
    const [newFormPanel, setNewFormPanel] = useState(newForm);

    //Methods
    const setIsNewTaskForm = (isNewTask) => {
        setNewFormPanel(isNewTask);
    };
    //View
      return(
        <div className='formPanelsContainer'>
            <Panel.Container>
                <div className = "headingAndButtons">
                    <h1 className = "left">Forms</h1>
                    <button className = "right" onClick={() => setIsNewTaskForm(true)}>+ New</button>
                </div>
                {
                    newFormPanel 
                        ? 
                            <div>
                                <NewFormPanel 
                                    formDetails = {{formID: 0, formName:""}}
                                    setIsNewTaskForm = {setIsNewTaskForm}
                                    rerenderForms={rerenderForms}
                                    loggedUser={loggedUser}/>
                            </div>
                        :""
                }
                {
                    
                    forms.map((form) => 
                    <FormPanel
                        key = {form.formID}
                        formDetails = {form} 
                        rerenderForms={rerenderForms}
                        loggedUser={loggedUser}/>
                    )
                }
            </Panel.Container>
        </div>
      );
}