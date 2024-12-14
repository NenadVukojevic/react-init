import React from 'react'
import ControlTitle from '../CustomControl/ControlTitle'
import ObjectForm from '../CustomControl/ObjectForm'

const CampaignConfigForm = ({ Dictionary, object, setObject, onSave, onCancel, domains, title }) => {


    return (
        <div>
            <ControlTitle title={`${title} - ${object.configName}`} />
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

export default CampaignConfigForm