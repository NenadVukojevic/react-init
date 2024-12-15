import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import { FormState, SortOrder } from '../Util/FormStates';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';
import ListOfUsers from './ListOfUsers';
import { boolDomain, UserDictionary } from '../CustomControl/TableDictionary';
import UserForm from './UserForm';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [state, setState] = useState(FormState.LIST);
    const [current, setCurrent] = useState({});
    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);

    const rowsPerPage = 10;

    useEffect(() => {

        const getUsers = async () => {
            request.request('GET', '/api/v1/userManagement/users').then((res) => {
                setUsers(res.data);
                console.log(res.data);
            });
        }
        state === FormState.LIST && getUsers();
    }, [state]);

    useEffect(() => {
        const paginator = new Paginator(users.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(users, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [users, sortRules, currentPage])



    const setSortOrder = (id) => {
        var newRule = {};
        if (sortRules.sortId === id) {
            if (sortRules.sortOrder === SortOrder.DESC) {
                newRule.sortOrder = SortOrder.ASC;
            }
            else {
                newRule.sortOrder = SortOrder.DESC;
            }
        }
        else {
            newRule.sortOrder = SortOrder.ASC;
        }
        newRule.sortId = id;
        setSortRules(newRule);
        setCurrentPage(1);
    }

    const onEdit = (id) => {
        request.request('GET', '/api/v1/userManagement/users/' + id).then((res) => {
            setCurrent(res.data);
            console.log(res.data);
            setState(FormState.EDIT);
        });

    }

    const onNew = () => {
        setCurrent({
            "id": 0,
            "username": "",
            "password": "",
            "name": "",
            "members": [],
            "enabled": true,
        });
        setState(FormState.NEW);
    }

    const onSave = () => {
        console.log("onSave", current);

        request.request('POST', '/api/v1/userManagement/users', current).then((res) => {
            setCurrent(res.data);
            console.log(res.data);
            setState(FormState.LIST);
        });
    }

    const onUpdate = () => {
        console.log("onSave", current);

        request.request('PUT', '/api/v1/userManagement/users', current).then((res) => {
            setCurrent(res.data);
            console.log(res.data);
            setState(FormState.LIST);
        });
    }


    const onCancel = () => {
        setState(FormState.LIST);
    }

    return (
        <div className='displayObject'>

            {
                state === FormState.LIST && (
                    <ListOfUsers
                        Dictionary={UserDictionary}
                        objects={displayPage}
                        setSortOrder={setSortOrder}
                        onEdit={onEdit}
                        onNew={onNew}
                        sortId={sortRules.sortId}
                        sortOrder={sortRules.sortOrder}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageCount={pageCount}
                    />
                )
            }


            {
                state === FormState.NEW && (
                    <UserForm
                        Dictionary={UserDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onSave}
                        onCancel={onCancel}
                        domains={[boolDomain]}
                        title="Add User"
                    />

                )

            }

            
            {
                state === FormState.EDIT && (
                    <UserForm
                        Dictionary={UserDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onUpdate}
                        onCancel={onCancel}
                        domains={[boolDomain]}
                        title="Edit User"
                    />

                )

            }
        </div>
    )
}

export default Users