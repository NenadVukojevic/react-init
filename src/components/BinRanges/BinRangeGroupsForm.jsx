import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import ControlTitle from '../CustomControl/ControlTitle'
import ObjectForm from '../CustomControl/ObjectForm'
import { BinRangesAvailableDictionary, BinRangesSelectedDictionary } from '../CustomControl/TableDictionary'
import DualListPane from '../CustomControl/DualListPane';

const BinRangeGroupsForm = ({ Dictionary, object, setObject, onSave, onCancel, title }) => {
    const [binRanges, setBinRanges] = useState([]);

    const [available, setAvailable] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {

        const getBinRanges = async () => {
            request.request('GET', '/api/v1/binRanges/').then((res) => {
                setBinRanges(res.data);
                console.log(res.data);
            });
        }
        getBinRanges();
    }, []);

    useEffect(() => {
        const filteredAvailable = binRanges.filter((obj) => !object.members.includes(obj.binRangeId));
        setAvailable(filteredAvailable);
        const filteredSelected = binRanges.filter((obj) => object.members.includes(obj.binRangeId));
        setSelected(filteredSelected);
    }, [object.members, binRanges]);

    const onAdd = (id) => {
        setObject((prevObject) => ({
            ...prevObject, // Spread the previous object to retain other properties
            members: [...prevObject.members, id], // Add new member to the array
        }));
    }

    const onRemove = (id) => {
        setObject((prevObject) => ({
            ...prevObject, // Retain other properties
            members: prevObject.members.filter((member) => member !== id), // Remove the specific member
        }));
    }

    return (
        <div>
            <ControlTitle title={title} />
            <ObjectForm
                dictionary={Dictionary}
                object={object}
                setObject={setObject}
                //onSave={onSave}
                onCancel={onCancel}
                domains={[]} />
            <ControlTitle title={"Edit Group Members"} />
            <div className='dualList'>
                <div>
                    <DualListPane Dictionary={BinRangesAvailableDictionary}
                        objects={available}
                        onEdit={onAdd}
                        title="Available"
                    />
                </div>
                <div><DualListPane
                    Dictionary={BinRangesSelectedDictionary}
                    objects={selected}
                    onEdit={onRemove}
                    title="Selected"
                /></div>
            </div>
            {
                typeof (onSave) === 'function' && (

                    <div className='formActionBar'>
                        <button onClick={onSave}>Save</button>

                        <button onClick={onCancel}>Cancel</button>
                    </div>
                )
            }
        </div>
    )
}

export default BinRangeGroupsForm