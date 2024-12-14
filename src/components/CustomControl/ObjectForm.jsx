import React, { useState } from 'react'
import { resolveNestedAttribute } from '../Util/util'

const ObjectForm = ({ dictionary, object, setObject, onSave, onCancel, domains, setDirty }) => {
    // in case that save button is active on this control
    // this is local dirty variable
    // in other case we are using setDirty from the up tree controls
    const [dirty, setdirty] = useState(false);
    const handleChange = (ev) => {
        //setObject(ev);
        setObject({ ...object, [ev.target.id]: ev.target.value })
        setDirty && setDirty(true);
        setdirty(true);
    }

    console.log("ObjectFOrm", domains, object);

    return (
        <div className='formDisplay'>
            {
                dictionary.map((element, index) => (
                    element.formType !== 'ignore' && (

                        <div key={index} className='formControl'>
                            <div className='formLabel'>
                                {element.title}
                            </div>
                            {
                                element.formType === 'input' && (
                                    <div className='formInput'>
                                        <input
                                            style={{ "width": element.width }}
                                            id={element.id}
                                            value={resolveNestedAttribute(object, element.id)}
                                            onChange={handleChange}
                                            type={element.controlType ? element.controlType : "text"}
                                        ></input>
                                    </div>

                                )
                            }
                            {
                                element.formType === 'textarea' && (
                                    <div className='formInput'>
                                        <textarea
                                            style={{ "width": element.width }}
                                            id={element.id}
                                            value={resolveNestedAttribute(object, element.id)}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                )
                            }
                            {
                                element.formType === 'select' && (

                                    <div className='formInput'>
                                        <select
                                            id={element.controlValue}
                                            value={resolveNestedAttribute(object, element.controlValue)}
                                            onChange={handleChange}
                                        >
                                            {
                                                domains[element.domainId].map((option, index) => (
                                                    <option
                                                        key={index}
                                                        value={resolveNestedAttribute(option, element.optionId)}
                                                    >
                                                        {resolveNestedAttribute(option, element.optionValue)}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                )
                            }


                        </div>

                    )
                ))
            }
            {
                typeof (onSave) === 'function' && (

                    <div className='formActionBar'>
                        <button disabled={!dirty} onClick={onSave}>Save</button>

                        <button onClick={onCancel}>Cancel</button>
                    </div>
                )
            }
        </div>
    )
}

export default ObjectForm