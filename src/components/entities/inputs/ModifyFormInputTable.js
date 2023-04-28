import { useState, useEffect } from 'react';
import API, { callFetch } from '../../api/API.js';
import TaskPanels from '../tasks/TaskPanels.js';

import '../../UI/InputTable.scss';
import ValidatedInput from '../../UI/ValidatedInput.js';

export default function ModifyFormInputTable({ object = null, formErrors, setIsNewTaskForm, setIsEditForm, attributes = null, deleteFormLines, rerenderForms, loggedUser, rerenderFormLines }) {
    //Initialisation
    const loggedinUserID = loggedUser.userID;
    //const endpointSaveForm = `/formlines/${formID}`;
    //const endpointCompleteTask = `/formlines/${formID}`;
    const endpointRecordings = `/recordings/`;
    const endpointSaveForm = `/forms/`;
    const endpointSaveFormLine = `/formlines/`;
    const loadingMessage = 'Loading...';

    // State
    const [formName, setFormName] = useState(object ? object.name : "New form");
    const [formAttributes, setFormAttributes] = useState(null);
    const [recordings, setRecordings] = useState(null);

    // Context
    // Methods
    const getFormLines = async () => {
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

        setFormAttributes(newFormAttributesArray);
    };

    useEffect(() => { getFormLines() }, []);

    const addFormAttribute = async () => {
        let newFormAttributesArray = [...formAttributes];
        console.log(newFormAttributesArray);
        let attributeID = newFormAttributesArray.length + 1;
        //essential subset of a form contents
        let attributes = [{id:'Attribute ' + attributeID, label:'Attribute ' + attributeID, recordingID: 1}];

        attributes.forEach(function(attribute){
            newFormAttributesArray.push({key:attribute.id, label: attribute.label, recordingID: attribute.recordingID});
        });

        setFormAttributes(newFormAttributesArray);
    };

    const getRecordings = async (endpoint) => {
        let allRecordingsArray = [];
        
        const response = await API.get(endpoint);
        console.log(response);
        response.result.forEach(recording => {
            allRecordingsArray.push({recordingID: recording.recordingID, type: recording.type});
        });
        //TODO: add retrieval of values from the database
        setRecordings(allRecordingsArray);
    };

    useEffect(() => { getRecordings(endpointRecordings)}, []);

    const apiCallSaveFormLines = async (endpoint, newFormID) => {
        console.log(newFormID);
        formAttributes.forEach( async (attribute) => {
            console.log(attribute);
            const response = await API.post(endpoint, {
                'recordingID': attribute.recordingID,
                'formID': newFormID
            });
            console.log(response);
        });
    };

    const apiCallSaveFormDetails = async (endpoint) => {
        const response = await API.post(endpoint, {
            'name': formName,
            'userID': loggedinUserID
        });
        console.log(response);

        return response;
    };

    const submitForm = async () => {
        //TODO: check for errors
        
        //save form info
        let response1 = await apiCallSaveFormDetails(endpointSaveForm);

        console.log(response1);

        //save form lines info
        if(response1.isSuccess){

            await apiCallSaveFormLines(endpointSaveFormLine, response1.result[0].formID);

            setIsNewTaskForm(false);
        }

        rerenderForms();
    };

    const saveFormChanges = async () => {
        //TODO: check for errors
        //remove the current form
        await deleteFormLines();
        //save updated form info
        await apiCallSaveFormLines(endpointSaveFormLine, object.formID);

        console.log("BEFORE RERENDERING");

        setIsEditForm(false);
        
        await rerenderForms();

        rerenderFormLines();
    };

    const handleChange = (event, attributeID) => {
        console.log(attributeID);
        let formAttributesCopy = [...formAttributes];
        //loop and find the right value to update
        formAttributesCopy.forEach((formAttCopy) => {
            console.log(formAttCopy);
            if(formAttCopy.key === attributeID) {
                formAttCopy.recordingID = event.target.value;
            }
        });
        console.log(formAttributesCopy);
        setFormAttributes(formAttributesCopy);
    };

    const handleNameChange = (event) => {
        setFormName(event.target.value);
    };

    /*const rerenderForms = async () => {
        //send event task completed
        const event = new Event('formsnumberchanged');
        window.dispatchEvent(event);
    };*/

    //{ formErrors[attribute.key] !== undefined ? formErrors[attribute.key] : "" }
    // View
    return (
        //check if attributes were retrieved
        !(formAttributes && recordings)
            ? <p>{loadingMessage}</p>
            : formAttributes.length == 0
                ? <p>The form is empty</p>
                : <div>
                    <table className="InputTable">
                        <tbody>
                        <tr key={0}>
                            <td className="left">Name  </td>
                            <td className="right">
                                <input onChange={ event => handleNameChange(event) } 
                                    defaultValue={formName} 
                                    placeholder=""/>
                            </td>
                        </tr>
                        {
                                formAttributes.map((attribute) => {
                                    return (
                                        <tr key={attribute.key}>
                                            <td className="left">{attribute.label}  </td>
                                            <td className="right">
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
                                                {<ValidatedInput type={"select"}
                                                                input={attribute}
                                                                handleChange={handleChange}
                                                                defaultValue={attribute.recordingID}
                                                                possibleValues={recordings}/>}
                                            </td>
                                        </tr>
                                    )
                                })
                        } 
                        </tbody>
                    </table>
                    <button onClick={() => addFormAttribute()}>Add attribute</button>
                    {
                        object.formID == 0
                            ?
                            <button onClick={() => submitForm()}>Submit</button>
                            :
                            <button onClick={() => saveFormChanges()}>Save</button>
                    }
                </div>
    );
}