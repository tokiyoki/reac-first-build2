import { useState, useEffect } from 'react';
import API, { callFetch } from '../../api/API.js';
import TaskPanels from '../tasks/TaskPanels.js';
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

    console.log(newAttributes);
    // State
    //const [taskName, setTaskName] = useState();
    //const [taskTime, setTaskTime] = useState();
    const [taskAttributes, setTaskAttributes] = useState(newAttributes);
    const [formAttribute, setFormAttribute] = useState(formAttributeInitial);
    const [forms, setForms] = useState(null);

    console.log(setIsNewTaskPanel);
    // Context
    // Methods
    /*const getFormLines = async () => {
        console.log(object);
        console.log(attributes);
        let newFormAttributesArray = [];
        let attributesNew =[];
        //essential subset of a form contents
        if(!attributes){
            attributesNew = [{id:'Attribute 1', label:'Attribute 1', recordingID: 1}];
        } else {
            let i = 1;
            attributes.forEach((attribute)=>{
                attributesNew.push({id: 'Attribute '+i, label: 'Attribute ' + i, value: object['attribute'+i], recordingID: object['attrID'+i]});
                i++;
            });
        }

        attributesNew.forEach(function(attribute){
            let value = attribute.value ? attribute.value : "";

            newFormAttributesArray.push({key:attribute.id, label: attribute.label, value: value, recordingID: attribute.recordingID});
        });

        setTaskAttributes(newFormAttributesArray);
    };*/

    //useEffect(() => { getFormLines() }, []);

    /*const addFormAttribute = async () => {
        let newFormAttributesArray = [...taskAttributes];
        console.log(newFormAttributesArray);
        let attributeID = newFormAttributesArray.length + 1;
        //essential subset of a form contents
        let attributes = [{id:'Attribute ' + attributeID, label:'Attribute ' + attributeID, recordingID: 1}];

        attributes.forEach(function(attribute){
            newFormAttributesArray.push({key:attribute.id, label: attribute.label, recordingID: attribute.recordingID});
        });

        setTaskAttributes(newFormAttributesArray);
    };*/

    /*const getRecordings = async (endpoint) => {
        let allRecordingsArray = [];
        
        const response = await API.get(endpoint);
        console.log(response);
        response.result.forEach(recording => {
            allRecordingsArray.push({recordingID: recording.recordingID, type: recording.type});
        });
        //TODO: add retrieval of values from the database
        setRecordings(allRecordingsArray);
    };*/
    
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

    /*const apiCallSaveFormLines = async (endpoint, newFormID) => {
        taskAttributes.forEach( async (attribute) => {
            console.log(attribute);
            const response = await API.post(endpoint, {
                'recordingID': attribute.recordingID,
                'formID': newFormID
            });
            
        });
    };

    const apiCallSaveFormDetails = async (endpoint) => {
        const response = await API.post(endpoint, {
            'name': taskName,
            'userID': loggedinUserID
        });
        console.log(response);

        return response;
    };

    

    const saveFormChanges = async () => {
        //TODO: check for errors
        //remove the current form
        await deleteFormLines();
        //save updated form info
        await apiCallSaveFormLines(endpointSaveFormLine, object.formID);

        setIsEditForm(false);
        
        rerenderForms();
    };

    

    

    */

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

    /*const handleNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTaskTime(event.target.value);
    };*/

    /*const rerenderTasks = async () => {
        //send event task completed
        const event = new Event('tasksnumberchanged');
        window.dispatchEvent(event);
    };*/

    //{ formErrors[attribute.key] !== undefined ? formErrors[attribute.key] : "" }
    // View
    return (
        //check if attributes were retrieved
        !(taskAttributes && forms)
            ? <p>{loadingMessage}</p>
            : <div>
                {/*<table className="InputTable">
                    <tbody>
                    {
                            taskAttributes.map((attribute) => {
                                return (
                                    <tr key={attribute.key}>
                                        <td className="left">{attribute.label}  </td>
                                        <td className="right">
                                            <input onChange={ event => handleChange(event, attribute.key) }
                                                   value={attribute.value} 
                                                   placeholder="" >

                                            </input>
                                        </td>
                                    </tr>
                                )
                            })
                    } 
                    </tbody>
                </table>*/}
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
                    //object.taskID == 0
                        //?
                        <div>
                            <button onClick={() => submitTask()}>Submit</button>
                            <button onClick={() => createNewForm()}>New form</button>
                        </div>
                        //:
                        //<button onClick={() => saveTaskChanges()}>Save</button>
                }
            </div>
    );
}