import { useState, useEffect } from 'react';
import API, { callFetch } from '../api/API.js';
import TaskPanels from '../entities/tasks/TaskPanels.js';

import './FormOfTaskObjectTable.scss';

export default function FormOfTaskObjectTable({ object=null, attributes, setIsNewTaskPanel }) {
    //Initialisation
    const loggedinUserID = 1;
    const endpointGetForms = `/forms/` + loggedinUserID;
    const endpointCreateTask = `/tasks/`;
    const loadingMessage = 'Loading...';

    // State
    const [taskName, setTaskName] = useState(object ? object.name : "New task");
    const [taskTime, setTaskTime] = useState(object ? object.taskTime : "00:00:00");
    const [taskAttributes, setTaskAttributes] = useState(attributes);
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
        response.result.forEach(form => {
            allFormsArray.push({formID: form.FormID, name: form.name});
        });
        //TODO: add retrieval of values from the database
        setForms(allFormsArray);
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
        const response = await API.post(endpoint, {
            'taskTime': taskTime, 
            'name': taskName,
            'description': attributes[0].value,
            'formID': attributes[2].value,
            'userID': loggedinUserID,
            'isCompleted': attributes[1].value
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
        console.log(formAttributesCopy);
        setTaskAttributes(formAttributesCopy);
    };

    const handleNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTaskTime(event.target.value);
    };

    const rerenderTasks = async () => {
        //send event task completed
        const event = new Event('tasksnumberchanged');
        window.dispatchEvent(event);
    };

    //{ formErrors[attribute.key] !== undefined ? formErrors[attribute.key] : "" }
    // View
    return (
        //check if attributes were retrieved
        !(taskAttributes && forms)
            ? <p>{loadingMessage}</p>
            : <div>
                <table className="FormOfTaskObjectTable">
                    <tbody>
                    <tr key={0}>
                        <td className="left">Name  </td>
                        <td className="right">
                            <input onChange={ event => handleNameChange(event) } 
                                defaultValue={taskName} 
                                placeholder=""/>
                        </td>
                    </tr>
                    <tr key={1}>
                        <td className="left">Time  </td>
                        <td className="right">
                            <input onChange={ event => handleTimeChange(event) } 
                                defaultValue={taskTime} 
                                placeholder=""/>
                        </td>
                    </tr>
                    {
                            taskAttributes.map((attribute) => {
                                return (
                                    <tr key={attribute.key}>
                                        <td className="left">{attribute.label}  </td>
                                        <td className="right">
                                            <input onChange={ event => handleChange(event, attribute.key) }
                                                   defaultValue={""} >

                                            </input>
                                            {/*<select onChange={ event => handleChange(event, attribute.key) } 
                                                    defaultValue={attribute.recordingID}>
                                                {
                                                    recordings.map((recording) => {
                                                        return (
                                                            <option key={recording.recordingID} 
                                                                    value = {recording.recordingID}
                                                                        >{recording.type}</option>
                                                        )
                                                    })
                                                }
                                            </select>*/}
                                        </td>
                                    </tr>
                                )
                            })
                    } 
                    </tbody>
                </table>
                {
                    //object.taskID == 0
                        //?
                        <button onClick={() => submitTask()}>Submit</button>
                        //:
                        //<button onClick={() => saveTaskChanges()}>Save</button>
                }
            </div>
    );
}