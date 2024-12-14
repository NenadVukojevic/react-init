import React from 'react'
import ObjectForm from '../CustomControl/ObjectForm'
import { boolDomain } from '../CustomControl/TableDictionary'
import ControlTitle from '../CustomControl/ControlTitle'

const BinRangeForm = (
    { Dictionary, object, setObject, onSave, onCancel, title }) => {


    return (
        <div>
            <ControlTitle title={title} />
            <ObjectForm
                dictionary={Dictionary}
                object={object}
                setObject={setObject}
                onSave={onSave}
                onCancel={onCancel}
                domains={[boolDomain]} />
        </div>
    )

}

export default BinRangeForm