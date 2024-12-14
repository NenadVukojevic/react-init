import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import { FormState, SortOrder } from '../Util/FormStates';
import { BinRangeDictionary } from '../CustomControl/TableDictionary';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';
import ListOfBinRanges from './ListOfBinRanges';
import BinRangeForm from './BinRangeForm';

const BinRanges = () => {
    const [binRanges, setBinRanges] = useState([]);
    const [state, setState] = useState(FormState.LIST);
    const [current, setCurrent] = useState({});
    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);

    const rowsPerPage = 10;

    useEffect(() => {

        const getBinRanges = async () => {
            request.request('GET', '/api/v1/binRanges/').then((res) => {
                setBinRanges(res.data);
                console.log(res.data);
            });
        }
        state === FormState.LIST && getBinRanges();
    }, [state]);

    useEffect(() => {
        const paginator = new Paginator(binRanges.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(binRanges, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [binRanges, sortRules, currentPage])



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
        const found = binRanges.find((obj) => obj.binRangeId === id);
        setCurrent(
            found
        );
        setState(FormState.EDIT);
    }

    const onNew = () => {
        setCurrent({
            "binRangeId": 0,
            "binRangeStart": 0,
            "binRangeEnd": 0,
            "institution": 1,
            "onUs": 1

        });
        setState(FormState.NEW);
    }

    const onSave = () => {
        request.request('POST', '/api/v1/binRanges/', current).then((res) => {
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
                    <ListOfBinRanges
                        Dictionary={BinRangeDictionary}
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
                    <BinRangeForm
                        Dictionary={BinRangeDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onSave}
                        onCancel={onCancel}
                        title="Edit Bin Range"
                    />

                )

            }

            {
                state === FormState.NEW && (
                    <BinRangeForm
                        Dictionary={BinRangeDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onSave}
                        onCancel={onCancel}
                        title="Add Bin Range"
                    />

                )

            }
        </div>
    )
}

export default BinRanges
