import React from 'react'
import ObjectForm from '../CustomControl/ObjectForm'
import ControlTitle from '../CustomControl/ControlTitle'

const ResponseForm = ({ Dictionary, object, setObject, onSave, onCancel, domains, title }) => {


    return (
        <div>
            <ControlTitle title={title} />
            <ObjectForm
                dictionary={Dictionary}
                object={object}
                setObject={setObject}
                onSave={onSave}
                onCancel={onCancel}
                domains={domains} />
        </div>
    )
}

export default ResponseForm