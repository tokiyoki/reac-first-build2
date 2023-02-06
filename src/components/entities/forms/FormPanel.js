import { useState, useEffect } from 'react';
import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';
import FormObjectTable from '../../UI/FormObjectTable.js';
import API from '../../api/API.js';
  

export default function FormPanel({formDetails, isFormEdit = false}) {
    //Initialisation
    const getFormLinesEndpoint = `/formlines/${formDetails.formID}`; //`/formlines/recordings/${formDetails.formID}`;
    const endpointDeleteFormLines = `/formlines/${formDetails.formID}`;
    const endpointDeleteFormDetails = `/forms/${formDetails.formID}`;
    //const getRecordingByIdEndpoint = `/recordings/`
    //State
    const [form, setForm] = useState(formDetails);
    const [isEditForm, setIsEditForm] = useState(isFormEdit);
    const [additionalAttributes, setAdditionalAttributes] = useState(null);
    /*const [formErrors, setFormErrors] = useState(
        Object.keys(attributes).reduce(
            (accum, key) => ({...accum, [key]: undefined}),
            {}
        )
    );*/

    //Context

    //Methods
    const apiCallGetAdditionalAttributes = async (endpoint) => {
        const additionalAttributesNew = [];
        const formNew = form;

        const response = await API.get(endpoint, 'GET');
        if(response.isSuccess){
            let i = 1;
            console.log(endpoint);
            console.log(response.result);
            response.result.forEach((attribute)=>{
                additionalAttributesNew.push({key: "attribute" + i, label: "attribute" + i});
                formNew["attrID" + i] = attribute.recordingID;
                formNew["attribute" + i] = attribute.type;
                i++;
            });
            setAdditionalAttributes(additionalAttributesNew)
            setForm(formNew);
        }
    };

    //get initial list of form lines
    useEffect(() => { apiCallGetAdditionalAttributes(getFormLinesEndpoint) }, []);
    
    //listen to events that change form content
    useEffect(()=>{
        window.addEventListener("formsnumberchanged", (event) => {
            apiCallGetAdditionalAttributes(getFormLinesEndpoint);
        });
      });

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

    const rerenderForms = async () => {
        //send event task completed
        const event = new Event('formsnumberchanged');
        window.dispatchEvent(event);
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
                    <FormObjectTable 
                        object={form} 
                        attributes={additionalAttributes}
                        setIsEditForm={setIsEditForm} 
                        /*formErrors= { formErrors }*/ />
                    <button onClick={() => setIsEditForm(false)}>Cancel</button>
                </Panel.Static>
            }  
        </Panel>
        );
}