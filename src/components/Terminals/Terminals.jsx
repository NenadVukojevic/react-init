import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import { TerminalDictionary } from '../CustomControl/TableDictionary';
import { FormState, SortOrder } from '../Util/FormStates';
import ListOfTerminals from './ListOfTerminals';
import TerminalForm from './TerminalForm';
import { sortArray } from '../Util/util';
import { Paginator } from '../CustomControl/Paginator';
const Terminals = () => {
    const [terminals, setTerminals] = useState([]);
    const [state, setState] = useState(FormState.LIST);
    const [current, setCurrent] = useState({});
    const [cities, setCities] = useState({});
    const [sortRules, setSortRules] = useState({"sortId":"", "sortOrder":SortOrder.ASC});
    //const [sortId, setSortId] = useState(null);
    //const [sortOrder, setsortOrder] = useState(SortOrder.ASC);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);

    const rowsPerPage = 10;

    useEffect(() => {
        const getCities = async () => {
            request.request('GET', '/api/v1/terminals/city').then((res) => {
                setCities(res.data);
                console.log(res.data);
            });
        }
        const getterminals = async () => {
            request.request('GET', '/api/v1/terminals/').then((res) => {
                setTerminals(res.data);
                console.log(res.data);
            });
        }
        state === FormState.LIST && getterminals();
        getCities();
    }, [state])


    useEffect(() => {
        const paginator = new Paginator(terminals.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(terminals, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [terminals, sortRules, currentPage])



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
        const found = terminals.find((obj) => obj.terminalId === id);
        setCurrent({
            "terminalId": found.terminalId,
            "tid": found.tid,
            "institutionId": found.institutionId,
            "cityId": found.city.cityId,
            "location": found.location,
            "description": found.description
        });
        setState(FormState.EDIT);
    }

    const onSave = async () => {
        console.log(current);
        await request.request('POST', '/api/v1/terminals/', current).then((res) => {
            setCurrent(res.data);
            console.log(res.data);
        });
        setState(FormState.LIST);
    }

    const onNew = () => {
        setCurrent({
            "terminalId": 0,
            "tid": "",
            "institutionId": 1,
            "cityId": cities[0]?.cityId,
            "location": "",
            "description": ""
        });
        setState(FormState.NEW);
    }

    const onCancel = () =>{
        setState(FormState.LIST);
    }

    return (
        <div className='displayObject'>

            {
                state === FormState.LIST && (
                    <ListOfTerminals
                        Dictionary={TerminalDictionary}
                        terminals={displayPage}
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
                    <TerminalForm
                        Dictionary={TerminalDictionary}
                        terminal={current}
                        setTerminal={setCurrent}
                        cities={cities}
                        onSave={onSave} 
                        onCancel={onCancel}
                        title="Edit Terminal"
                        />

                )

            }

            {
                state === FormState.NEW && (
                    <TerminalForm
                        Dictionary={TerminalDictionary}
                        terminal={current}
                        setTerminal={setCurrent}
                        cities={cities}
                        onSave={onSave}
                        onCancel={onCancel}
                        title="Add Terminal"
                         />

                )

            }
        </div>
    )
}

export default Terminals