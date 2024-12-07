import React from 'react'
import ObjectForm from '../CustomControl/ObjectForm'

const ResponseForm = ({ Dictionary, object, setObject, onSave, onCancel }) => {

    
    return (
        <ObjectForm
            dictionary={Dictionary}
            object={object}
            setObject={setObject}
            onSave={onSave} 
            onCancel={onCancel}
            domains={[]}/>
    )
}

export default ResponseForm