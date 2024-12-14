import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import { FormState, SortOrder } from '../Util/FormStates';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';
import ListOfTerminalGroups from './ListOfTerminalGroups';
import { TerminalGroupDictionary } from '../CustomControl/TableDictionary';
import TerminalGroupForm from './TerminalGroupForm';

const TerminalGroups = () => {
    const [terminalGroups, setterminalGroups] = useState([]);
    const [state, setState] = useState(FormState.LIST);
    const [current, setCurrent] = useState({ "terminalName": "", "members": [] });
    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);

    const rowsPerPage = 10;

    useEffect(() => {

        const getResponses = async () => {
            request.request('GET', '/api/v1/terminals/terminalGroup').then((res) => {
                setterminalGroups(res.data);
                console.log(res.data);
            });
        }
        state === FormState.LIST && getResponses();
    }, [state]);

    useEffect(() => {
        const paginator = new Paginator(terminalGroups.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(terminalGroups, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [terminalGroups, sortRules, currentPage])



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
        /*
         const found = terminalGroups.find((obj) => obj.responseId === id);
        setCurrent(
            found
        );
        */
        request.request('GET', '/api/v1/terminals/terminalGroup/' + id).then((res) => {
            setCurrent(res.data);
            console.log(res.data);
        });
        setState(FormState.EDIT);
    }

    const onNew = () => {
        setCurrent({
            "terminalGroupId": "",
            "terminalName": "",
            "members": []
        });
        setState(FormState.NEW);
    }

    const onUpdate = () => {
        request.request('PUT', '/api/v1/terminals/terminalGroup', current).then((res) => {
            setCurrent(res.data);
            console.log(res.data);
            setState(FormState.LIST);
        });

    }

    const onSave = () => {
        request.request('POST', '/api/v1/terminals/terminalGroup', current).then((res) => {
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
                    <ListOfTerminalGroups
                        Dictionary={TerminalGroupDictionary}
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
                state === FormState.EDIT && (
                    <TerminalGroupForm
                        Dictionary={TerminalGroupDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onUpdate}
                        onCancel={onCancel}
                        title="Edit Terminal Group"
                    />

                )

            }

            {
                state === FormState.NEW && (
                    <TerminalGroupForm
                        Dictionary={TerminalGroupDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onSave}
                        onCancel={onCancel}
                        title="Add Terminal Group"
                    />

                )

            }

        </div>
    )
}

export default TerminalGroups