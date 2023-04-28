import { useState, useEffect } from 'react';
import API, { callFetch } from '../../api/API.js';
import TaskPanels from '../tasks/TaskPanels.js';

import InputTable from '../../UI/InputTable.js';
import '../../UI/InputTable.scss';

export default function CompleteTaskInputTable({ object, formID, formErrors, setIsTaskForm }) {
    //Initialisation
    const endpointFormLines = `/formlines/${formID}`;
    const loadingMessage = 'Loading...';

    const endpointTaskRecordings = `/taskrecordings/`;

    const endpointCompleteTask = `/tasks/${object.taskID}`;

    // State
    const [formAttributes, setFormAttributes] = useState(null);

    // Context
    // Methods
    const apiCallGetFormLines = async (endpoint) => {
        const response = await API.get(endpoint, 'GET');
        console.log(response);
        let newFormAttributesArray = [];

        if(response.result){
            response.result.forEach(function(recording){
                newFormAttributesArray.push({key:recording.recordingID, label: recording.recordingType, value: "", type: "number"});
                console.log(recording);
            });
        }

        console.log(newFormAttributesArray);

        setFormAttributes(newFormAttributesArray);
    };

    useEffect(() => { apiCallGetFormLines(endpointFormLines) } , [endpointFormLines]);

    const apiCallSaveTaskRecordings = async (endpoint) => {
        formAttributes.forEach( async (attribute) => {
            const response = await API.post(endpoint, {
                'recordingID': attribute.key,
                'taskID': object.taskID,
                'value': attribute.value
            });
            console.log(response);
        });
        //TODO: complete changing
    };

    const apiCallCompleteTask = async (endpoint) => {
        const response = await API.put(endpoint, { isCompleted: "1" });
        console.log(response);
    };

    const submitForm = () => {
        //TODO: check for errors

        //send request
        apiCallSaveTaskRecordings(endpointTaskRecordings);

        //send task completion API call
        apiCallCompleteTask(endpointCompleteTask);

        //send event task completed
        const event = new Event('taskcompleted');
        window.dispatchEvent(event);
        console.log('yes');
    };

    const handleChange = (event, recordingID) => {
        let formAttributesCopy = [...formAttributes];
        //loop and find the right value to update
        formAttributesCopy.forEach((formAttCopy) => {
            if(formAttCopy.key === recordingID) {
                formAttCopy.value = event.target.value;
            }
        });
        console.log(formAttributes);
        setFormAttributes(formAttributesCopy);
    };

    console.log(formAttributes);

    //{ formErrors[attribute.key] !== undefined ? formErrors[attribute.key] : "" }
    // View
    return (
        //check if attributes were retrieved
        !formAttributes
            ? <p>{loadingMessage}</p>
            : formAttributes.length == 0
                ? <p>The form is empty</p>
                : <div>
                    {/*<table className="TaskFormObjectTable">
                        <tbody>
                        {
                                formAttributes.map((attribute) => {
                                    return (
                                        <tr key={attribute.key}>
                                            <td className="left">{attribute.label}  </td>
                                            <td className="right">
                                                <input onChange={ event => handleChange(event, attribute.key) } 
                                                    value={attribute.value} 
                                                    placeholder=""/>
                                            </td>
                                        </tr>
                                    )
                                })
                        } 
                    </tbody>
                    </table>*/}
                    <InputTable inputs={formAttributes} handleChange={handleChange}/>
                    <button onClick={() => setIsTaskForm(false)}>Back</button>
                    <button onClick={() => submitForm()}>Submit</button>
                </div>
    );
}