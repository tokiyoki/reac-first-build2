import { useState, useEffect } from 'react';
import API, { callFetch } from '../api/API.js';
import TaskPanels from '../entities/tasks/TaskPanels.js';

import './InputTable.scss';
import ValidatedInput from './ValidatedInput.js';

export default function InputTable(props, { inputs = props.inputs, handleChange = props.handleChange }) {

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
                                    {
                                        <ValidatedInput input={input} handleChange={handleChange}/>
                                    }
                                </td>
                            </tr>
                        )
                    })
            } 
            {props.children}
            </tbody>
        </table>
    );
}