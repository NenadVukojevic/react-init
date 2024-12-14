import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper'
import { FormState, SortOrder } from '../Util/FormStates';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';
import ListOfCities from './ListOfCities';
import { CityDictionary } from '../CustomControl/TableDictionary';
import CityForm from './CityForm';

const City = () => {

    const [cities, setCities] = useState([]);
    const [state, setState] = useState(FormState.LIST);
    const [current, setCurrent] = useState({});
    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
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

        state === FormState.LIST && getCities();
    }, [state])


    useEffect(() => {
        const paginator = new Paginator(cities.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(cities, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [cities, sortRules, currentPage])



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
        const found = cities.find((obj) => obj.cityId === id);
        setCurrent(found);
        setState(FormState.EDIT);
    }

    const onSave = async () => {
        console.log(current);
        await request.request('POST', '/api/v1/terminals/city', current).then((res) => {
            setCurrent(res.data);
            console.log(res.data);
        });
        setState(FormState.LIST);
    }

    const onNew = () => {
        setCurrent({
            "cityId": 0,
            "cityCode": "",
            "citiName": ""
        });
        setState(FormState.NEW);
    }

    const onCancel = () => {
        setState(FormState.LIST);
    }

    return (
        <div className='displayObject'>

            {
                state === FormState.LIST && (
                    <ListOfCities
                        Dictionary={CityDictionary}
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
                    <CityForm
                        Dictionary={CityDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onSave}
                        onCancel={onCancel}
                        domains={[]}
                        title="Edit City"
                    />

                )

            }

            {
                state === FormState.NEW && (
                    <CityForm
                        Dictionary={CityDictionary}
                        object={current}
                        setObject={setCurrent}
                        onSave={onSave}
                        onCancel={onCancel}
                        domains={[]}
                        title="Add City"
                    />

                )

            }
        </div>
    )
}

export default City