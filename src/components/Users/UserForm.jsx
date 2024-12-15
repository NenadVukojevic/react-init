import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import ControlTitle from '../CustomControl/ControlTitle'
import ObjectForm from '../CustomControl/ObjectForm'
import DualListPane from '../CustomControl/DualListPane';
import {  RoleGroupsAvailableDictionary, RoleGroupsSelectedDictionary } from '../CustomControl/TableDictionary';

const UserForm = ({ Dictionary, object, setObject, onSave, onCancel, domains, title }) => {

    const [groups, setGroups] = useState([]);

    const [available, setAvailable] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {

        const getGroups = async () => {
            request.request('GET', '/api/v1/userManagement/groups').then((res) => {
                setGroups(res.data);
                console.log(res.data);
            });
        }
        getGroups();
    }, []);

    useEffect(() => {
        const filteredAvailable = groups.filter((obj) => !object.members.includes(obj.groupId));
        setAvailable(filteredAvailable);
        const filteredSelected = groups.filter((obj) => object.members.includes(obj.groupId));
        setSelected(filteredSelected);
    }, [object.members, groups]);

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
                onSave={onSave}
                onCancel={onCancel}
                domains={domains} />

            <div className='dualList'>
                <div>
                    <DualListPane Dictionary={RoleGroupsAvailableDictionary}
                        objects={available}
                        onEdit={onAdd}
                        title="Available"
                    />
                </div>
                <div><DualListPane
                    Dictionary={RoleGroupsSelectedDictionary}
                    objects={selected}
                    onEdit={onRemove}
                    title="Selected"
                /></div>
            </div>
        </div>
    )
}

export default UserForm