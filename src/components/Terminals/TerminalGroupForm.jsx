import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import ControlTitle from '../CustomControl/ControlTitle';
import DualListPane from '../CustomControl/DualListPane';
import ObjectForm from '../CustomControl/ObjectForm';
import { TerminalsAvailableDictionary, TerminalsSelectedDictionary } from '../CustomControl/TableDictionary';

const TerminalGroupForm = ({ Dictionary, object, setObject, onSave, onCancel, title }) => {
    const [terminals, setTerminals] = useState([]);

    const [available, setAvailable] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {

        const getterminals = async () => {
            request.request('GET', '/api/v1/terminals/').then((res) => {
                setTerminals(res.data);
                console.log(res.data);
            });
        }
        getterminals();
    }, []);

    useEffect(() => {
        const filteredAvailable = terminals.filter((obj) => !object.members.includes(obj.terminalId));
        setAvailable(filteredAvailable);
        const filteredSelected = terminals.filter((obj) => object.members.includes(obj.terminalId));
        setSelected(filteredSelected);
    }, [object.members, terminals]);

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
                    <DualListPane Dictionary={TerminalsAvailableDictionary}
                        objects={available}
                        onEdit={onAdd}
                        title="Available"
                    />
                </div>
                <div><DualListPane
                    Dictionary={TerminalsSelectedDictionary}
                    objects={selected}
                    onEdit={onRemove}
                    title="Selected"
                /></div>
            </div>
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

export default TerminalGroupForm