import { useState, useEffect } from 'react';
import API, { callFetch } from '../../api/API.js';
import { useNavigate } from 'react-router-dom';

import '../../UI/InputTable.scss';
import InputTable from '../../UI/InputTable.js';
import ValidatedInput from '../../UI/ValidatedInput.js';

export default function ModifyTaskInputTable({ object=null, attributes, formAttributeInitial, setIsNewTaskPanel, loggedUser, rerenderTasks }) {
    //Initialisation
    const loggedinUserID = loggedUser;
    const endpointGetForms = `/forms/users/` + loggedinUserID;
    const endpointCreateTask = `/tasks/`;
    const loadingMessage = 'Loading...';

    const navigate = useNavigate();

    const taskNameInitial = object ? object.name : "New task";
    const taskTimeInitial = object ? object.taskTime : "00:00:00";

    const newAttributes = [
        {key: 'name', label:'Name', value: 'New task', type: 'text'},
        {key: 'taskTime', label:'Task Time', value: '00:00:00', type: 'time'},
         ...attributes];

    // State
    const [taskAttributes, setTaskAttributes] = useState(newAttributes);
    const [formAttribute, setFormAttribute] = useState(formAttributeInitial);
    const [forms, setForms] = useState(null);

    // Context
    // Methods
    const getForms = async (endpoint) => {
        let allFormsArray = [];
        
        const response = await API.get(endpoint);
        console.log(response);
        if(response.isSuccess){
                response.result.forEach(form => {
                allFormsArray.push({recordingID: form.formID, type: form.name}); //to be able to reuse ValidatedInput
            });
            //TODO: add retrieval of values from the database
            setForms(allFormsArray);
        } else {
            setForms([])
        }
    };

    useEffect(() => { getForms(endpointGetForms)}, []);

    const apiCallSaveTaskDetails = async (endpoint) => {
        console.log(attributes);
        const response = await API.post(endpoint, {
            'taskTime': taskAttributes[1].value, 
            'name': taskAttributes[0].value,
            'description': taskAttributes[2].value,
            'formID': formAttribute.value,
            'userID': loggedinUserID,
            'isCompleted': 0
        });
        console.log(response);

        return response;
    };

    const submitTask = async () => {
        //TODO: check for errors
        
        //save form info
        let response1 = await apiCallSaveTaskDetails(endpointCreateTask);

        console.log(response1);

        //save form lines info
        if(response1.isSuccess){

            console.log(setIsNewTaskPanel);

            setIsNewTaskPanel(false);
        }

        rerenderTasks();
    };

    const createNewForm = async () => {
        //navigate to form page and create new form
        navigate('/user?createForm=true', {replace: true} );
    };

    const handleChange = (event, attributeID) => {
        console.log(attributeID);
        let formAttributesCopy = [...taskAttributes];
        //loop and find the right value to update
        formAttributesCopy.forEach((formAttCopy) => {
            console.log(formAttCopy);
            if(formAttCopy.key === attributeID) {
                formAttCopy.value = event.target.value;
            }
        });

        if(formAttribute.key === attributeID) {
            const formAttCopy = formAttribute;
            formAttCopy.value = event.target.value;
            console.log(formAttCopy);
            setFormAttribute(formAttCopy);
            console.log(formAttribute);
        }

        console.log(formAttributesCopy);
        setTaskAttributes(formAttributesCopy);
    };

    
    // View
    return (
        //check if attributes were retrieved
        !(taskAttributes && forms)
            ? <p>{loadingMessage}</p>
            : <div>
                <InputTable inputs={taskAttributes} handleChange={handleChange}>
                {   
                    <tr key={formAttribute.key}>
                        <td className="left">{formAttribute.label}  </td>
                        <td className="right">
                            <ValidatedInput type={"select"}
                                input={formAttribute}
                                handleChange={handleChange}
                                //defaultValue={attribute.formID}
                                possibleValues={forms}/>
                        </td>
                    </tr>
                }
                </InputTable>
                {
                        <div>
                            <button onClick={() => submitTask()}>Submit</button>
                            <button onClick={() => createNewForm()}>New form</button>
                        </div>
                }
            </div>
    );
}