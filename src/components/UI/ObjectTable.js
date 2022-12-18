import { useState, useEffect } from 'react';
import API, { callFetch } from '../api/API.js';

import './ObjectTable.scss';

export default function ObjectTable({ object, formID, attributes, isForm = false }) {
    //Initialisation
    const endpointFormLines = `/formlines/${formID}`;
    const loadingMessage = 'Loading...';

    const endpointTaskRecordings = `/taskrecordings/`;

    const endpointCompleteTask = `/tasks/completetask/${object.taskID}`;

    // State
    const [isTaskForm, setIsTaskForm] = useState(isForm);
    const [formAttributes, setFormAttributes] = useState(null);
    
    // Context
    // Methods
    const apiCallGetFormLines = async (endpoint) => {
        const response = await API.get(endpoint, 'GET');
        console.log("form?"+isTaskForm);
        let newFormAttributesArray = [];

        response.result.forEach(function(recording){
            newFormAttributesArray.push({key:recording.recordingID, label: recording.type, value: ""});
        });

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
        const response = await API.post(endpoint, {});
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
            <div>
                {
                //check if attributes were retrieved
                isTaskForm && !formAttributes
                    ? <p>{loadingMessage}</p>
                    : isTaskForm && formAttributes.length == 0
                        ? <p>The form is empty</p>
                        :   <table className="ObjectTable">
                                <tbody>
                                {
                                    isTaskForm
                                        ? formAttributes.map((attribute) => {
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
                                        : attributes.map((attribute) => {
                                                const value = typeof(object[attribute.key]) === "number" ? (object[attribute.key] === 1 ? "Completed" : "Not Completed") : object[attribute.key];
                                                return (
                                                <tr key={attribute.key}>
                                                    <td className="left">{attribute.label}</td>
                                                    <td className="right">{value}</td>
                                                </tr>
                                                )
                                            }) 
                                } 
                                </tbody>
                            </table>
                
                }
                { <button onClick={() => setIsTaskForm(!isTaskForm)}>{isTaskForm ? 'Back' : 'Complete' }</button> }
                { isTaskForm && <button onClick={() => submitForm()}>Submit</button> }
        </div>
    );
}
/*


                    
*/