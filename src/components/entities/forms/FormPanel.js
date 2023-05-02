import { useState, useEffect } from 'react';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';
import ModifyFormInputTable from '../inputs/ModifyFormInputTable.js';
import API from '../../api/API.js';
  

export default function FormPanel({formDetails, isFormEdit = false, rerenderForms, loggedUser}) {
    //Initialisation
    const getFormLinesEndpoint = `/formlines/${formDetails.formID}`; 
    const endpointDeleteFormLines = `/formlines/${formDetails.formID}`;
    const endpointDeleteFormDetails = `/forms/${formDetails.formID}`;

    //State
    const [form, setForm] = useState(formDetails);
    const [isEditForm, setIsEditForm] = useState(isFormEdit);
    const [additionalAttributes, setAdditionalAttributes] = useState(null);

    //Context

    //Methods
    const apiCallGetAdditionalAttributes = async (endpoint) => {
        const additionalAttributesNew = [];
        const formNew = form;

        console.log("GETTING new form lines");

        const response = await API.get(endpoint, 'GET');
        if(response.isSuccess){
            let i = 1;
            console.log(endpoint);
            console.log(response.result);
            response.result.forEach((attribute)=>{
                additionalAttributesNew.push({key: "attribute" + i, label: "Attribute " + i});
                formNew["attrID" + i] = attribute.recordingID;
                formNew["attribute" + i] = attribute.recordingType;
                i++;
            });
            setAdditionalAttributes(additionalAttributesNew);
            setForm(formNew);
        }
    };

    //get initial list of form lines
    useEffect(() => { apiCallGetAdditionalAttributes(getFormLinesEndpoint) }, []);
    
    const rerenderFormLines = () => {
        apiCallGetAdditionalAttributes(getFormLinesEndpoint);
    };

    const apiCallDeleteFormLines = async (endpoint) => {
        console.log(endpoint);
        const response = await API.delete(endpoint, {});
        console.log(response);
    };

    const apiCallDeleteFormDetails = async (endpoint) => {
        const response = await API.delete(endpoint, {});
        console.log(response);
    };

    const removeForm = async () => {
        await apiCallDeleteFormLines(endpointDeleteFormLines);

        await apiCallDeleteFormDetails(endpointDeleteFormDetails);

        rerenderForms();
    };

    const deleteFormLines = async () => {
        await apiCallDeleteFormLines(endpointDeleteFormLines);

        rerenderForms();
    };

    //View
      return(
        <Panel 
            key={form.formID}
            title={` ${form.name}`}
            level={1}>
                
            {
                !isEditForm ?
                    <Panel.Static level={2}>
                        <ObjectTable 
                            object={form}
                            attributes={additionalAttributes} />
                        <button onClick={() => setIsEditForm(true)}>Edit</button>
                        <button onClick={() => removeForm()}>Remove</button>
                    </Panel.Static>
                :
                <Panel.Static level={2}>
                    <ModifyFormInputTable 
                        object={form} 
                        attributes={additionalAttributes}
                        setIsEditForm={setIsEditForm} 
                        deleteFormLines={deleteFormLines}
                        /*formErrors= { formErrors }*/ 
                        rerenderForms={rerenderForms}
                        loggedUser={loggedUser}
                        rerenderFormLines={rerenderFormLines}_/>
                    <button onClick={() => setIsEditForm(false)}>Cancel</button>
                </Panel.Static>
            }  
        </Panel>
        );
}