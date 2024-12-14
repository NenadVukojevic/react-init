import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import { FormState, SortOrder } from '../Util/FormStates';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';
import ListOfBinRangeGroups from './ListOfBinRangeGroups';
import { BinRangeGroupDictionary } from '../CustomControl/TableDictionary';
import BinRangeGroupsForm from './BinRangeGroupsForm';

const BinRangeGroups = () => {
    const [binRangeGroups, setBinRangeGroups] = useState([]);
    const [state, setState] = useState(FormState.LIST);
    const [current, setCurrent] = useState({ "binRangeName": "", "members": [] });
    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);

    const rowsPerPage = 10;

    useEffect(() => {

        const getResponses = async () => {
            request.request('GET', '/api/v1/binRanges/groups').then((res) => {
                setBinRangeGroups(res.data);
                console.log(res.data);
            });
        }
        state === FormState.LIST && getResponses();
    }, [state]);

    useEffect(() => {
        const paginator = new Paginator(binRangeGroups.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(binRangeGroups, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [binRangeGroups, sortRules, currentPage])



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
         const found = binRangeGroups.find((obj) => obj.responseId === id);
        setCurrent(
            found
        );
        */
        request.request('GET', '/api/v1/binRanges/groups/' + id).then((res) => {
            setCurrent(res.data);
            console.log(res.data);
        });
        setState(FormState.EDIT);
    }

    const onNew = () => {
        setCurrent({
            "binRangeGroupId": "",
            "binRangeName": "",
            "members": []
        });
        setState(FormState.NEW);
    }

    const onUpdate = () => {
        request.request('PUT', '/api/v1/binRanges/groups', current).then((res) => {
            setCurrent(res.data);
            console.log(res.data);
            setState(FormState.LIST);
        });

    }

    const onSave = () => {
        request.request('POST', '/api/v1/binRanges/groups', current).then((res) => {
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
                    <ListOfBinRangeGroups
                        Dictionary={BinRangeGroupDictionary}
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
                    <BinRangeGroupsForm
                        Dictionary={BinRangeGroupDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onUpdate}
                        onCancel={onCancel}
                        title="Edit Bin Range Group"
                    />

                )

            }

            {
                state === FormState.NEW && (
                    <BinRangeGroupsForm
                        Dictionary={BinRangeGroupDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onSave}
                        onCancel={onCancel}
                        title="Add Bin Range Group"
                    />

                )

            }

        </div>
    )
}

export default BinRangeGroups