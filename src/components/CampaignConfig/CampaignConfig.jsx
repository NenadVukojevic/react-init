import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import { FormState, SortOrder } from '../Util/FormStates';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';
import { CampaingConfigDictionary } from '../CustomControl/TableDictionary';
import ListOfCampaignConfigs from './ListOfCampaignConfigs';
import CampaignConfigForm from './CampaignConfigForm';
import ListOfOptions from '../CustomControl/ListOfOptions';

const CampaignConfig = () => {
    const [config, setConfig] = useState([]);
    const [state, setState] = useState(FormState.LIST);
    const [current, setCurrent] = useState({});
    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);

    const rowsPerPage = 10;

    useEffect(() => {

        const getConfig = async () => {
            request.request('GET', '/api/v1/campaign/config').then((res) => {
                setConfig(res.data);
                console.log(res.data);
            });
        }
        state === FormState.LIST && getConfig();
    }, [state]);

    useEffect(() => {
        const paginator = new Paginator(config.length, rowsPerPage, currentPage);

        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(config, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [config, sortRules, currentPage])



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
        const found = config.find((obj) => obj.configName === id);
        console.log("onEdint", found);
        setCurrent(
            found
        );
        setState(FormState.EDIT);
    }

    const onNew = () => {
        setCurrent({
            "configName": "",
            "configValue": ""
        });
        setState(FormState.NEW);
    }

    const onSave = () => {
        request.request('PUT', '/api/v1/campaign/config', current).then((res) => {
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
            <ListOfOptions
                Dictionary={CampaingConfigDictionary}
                objects={displayPage}
                setSortOrder={setSortOrder}
                onEdit={onEdit}
                onNew={onNew}
                sortId={sortRules.sortId}
                sortOrder={sortRules.sortOrder}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageCount={pageCount}
                title="Campaign Config"
            />
        )

    }
    {
        state === FormState.EDIT && (
            <CampaignConfigForm
                Dictionary={CampaingConfigDictionary}
                object={current}
                setObject={setCurrent}
                onSave={onSave}
                onCancel={onCancel}
                title="Edit Config"
            />

        )

    }
    </div>
  )
}

export default CampaignConfig