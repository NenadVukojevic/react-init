import React from 'react'
import AtmButton from './AtmButton'

const LinkButtons = ({ responses, used, onClick, selected }) => {

    function hasValue(set, value) {
        return set.has(value.toString()) || set.has(value);
    }

    return (
        <div style={{visibility:'hidden'}}>
            <div>
                Used responses
            </div>
            <div className="atm_button_group" title="Double click button to use!">

                {responses.map((response, index) => (
                    hasValue(used, response.responseId) && (
                        <AtmButton
                            selected={selected}
                            response={response}
                            onClick={() => onClick(response.responseId)
                            }
                            key={index}

                        />
                    )
                )
                )}
            </div>
        </div>
    )
}

export default LinkButtons