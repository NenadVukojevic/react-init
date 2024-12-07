import React from 'react'
import { resolveNestedAttribute } from '../Util/util'

const ObjectForm = ({ dictionary, object, setObject, onSave, onCancel, domains }) => {

    const handleChange = (ev) => {
        setObject({ ...object, [ev.target.id]: ev.target.value });

    }
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
                                            style={{"width":element.width}}
                                            id={element.id}
                                            value={resolveNestedAttribute(object, element.id)}
                                            onChange={handleChange}
                                            type={element.controlType?element.controlType:"text"}
                                        ></input>
                                    </div>

                                )
                            }
                            {
                                element.formType === 'textarea' && (
                                    <div className='formInput'>
                                        <textarea
                                            style={{"width":element.width}}
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

                    <div className='formInput'>
                        <button onClick={onSave}>Save</button>

                        <button onClick={onCancel}>Cancel</button>
                    </div>
                )
            }
        </div>
    )
}

export default ObjectForm