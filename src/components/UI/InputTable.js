import { useState, useEffect } from 'react';
import API, { callFetch } from '../api/API.js';
import TaskPanels from '../entities/tasks/TaskPanels.js';

import './InputTable.scss';
import ValidatedInput from './ValidatedInput.js';

export default function InputTable({ inputs, handleChange }) {
    
    /*const handleChange = (event, recordingID) => {
        let formAttributesCopy = [...formAttributes];
        //loop and find the right value to update
        formAttributesCopy.forEach((formAttCopy) => {
            if(formAttCopy.key === recordingID) {
                formAttCopy.value = event.target.value;
            }
        });
        console.log(formAttributes);
        setFormAttributes(formAttributesCopy);
    };*/

    console.log();

    //{ formErrors[attribute.key] !== undefined ? formErrors[attribute.key] : "" }
    // View
    return (
        //check if attributes were retrieved
        <table className="InputTable">
            <tbody>
            {
                    inputs.map((input) => {
                        return (
                            <tr key={input.key}>
                                <td className="left">{input.label}  </td>
                                <td className="right">
                                    {/*<input onChange={ event => handleChange(event, input.key) } 
                                        value={input.value} 
                        placeholder=""/>*/}
                                    <ValidatedInput input={input} handleChange={handleChange}/>
                                </td>
                            </tr>
                        )
                    })
            } 
            </tbody>
        </table>
    );
}