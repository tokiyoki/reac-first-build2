import './ValidatedInput.scss';

export default function ValidatedInput({ type, input, handleChange, defaultValue, possibleValues }) {
    // View
    return (
        <div>
        {
            !type ? // check if default input
                <input onChange={ event => handleChange(event, input.key) } 
                                        value={input.value} 
                                        placeholder=""
                                        type={input.type}/>
            : //not default input
                type === "select" ? //check if select input
                <select onChange={ event => handleChange(event, input.key) } 
                        defaultValue={defaultValue}>
                    {
                        possibleValues.map((possibleValues) => {
                            return (
                                <option key={possibleValues.recordingID} 
                                        value = {possibleValues.recordingID}
                                            >{possibleValues.type}</option>
                            )
                        })
                    }
                </select>
                : "" //not select input
        }
        </div>
    );
}