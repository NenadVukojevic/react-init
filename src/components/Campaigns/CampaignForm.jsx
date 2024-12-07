import React from 'react'
import ObjectForm from '../CustomControl/ObjectForm'

const CampaignForm = ({ Dictionary, object, setObject, domains }) => {
    return (
        <ObjectForm
            dictionary={Dictionary}
            object={object}
            setObject={setObject}
           // onSave={onSave}
            //onCancel={onCancel}
            domains={domains} />
    )
}

export default CampaignForm