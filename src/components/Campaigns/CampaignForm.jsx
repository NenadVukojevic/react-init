import React from 'react'
import ObjectForm from '../CustomControl/ObjectForm'

const CampaignForm = ({ Dictionary, object, setObject, domains, setDirty }) => {
    return (
        <ObjectForm
            dictionary={Dictionary}
            object={object}
            setObject={setObject}
           // onSave={onSave}
            //onCancel={onCancel}
            setDirty={setDirty}
            domains={domains} />
    )
}

export default CampaignForm