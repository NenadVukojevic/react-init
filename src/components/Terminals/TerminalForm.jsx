import React from 'react'
import ObjectForm from '../CustomControl/ObjectForm'
import ControlTitle from '../CustomControl/ControlTitle'


const TerminalForm = ({ Dictionary, terminal, setTerminal, cities, onSave, onCancel, title }) => {


    return (
        <div>
            <ControlTitle title={title} />
            <ObjectForm
                dictionary={Dictionary}
                object={terminal}
                setObject={setTerminal}
                onSave={onSave}
                onCancel={onCancel}
                domains={[cities]} />
        </div>
    )
}

export default TerminalForm