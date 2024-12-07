import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import { FormState, SortOrder } from '../Util/FormStates';
import ListOfCampaigns from './ListOfCampaigns';
import { CampaignDictionary } from '../CustomControl/TableDictionary';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';
import { useNavigate } from 'react-router-dom';
import { basename } from '../Util/Constants';

const Campaigns = () => {

    const navigate = useNavigate();

    const [campaigns, setCampaigns] = useState([]);
    const [state, setState] = useState(FormState.LIST);
    const [current, setCurrent] = useState({});
    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);


    const rowsPerPage = 10;

    useEffect(() => {

        const getResponses = async () => {
            request.request('GET', '/api/v1/campaign/').then((res) => {
                setCampaigns(res.data);
                console.log(res.data);
            });
        }
        state === FormState.LIST && getResponses();
    }, [state]);

    useEffect(() => {
        const paginator = new Paginator(campaigns.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(campaigns, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [campaigns, sortRules, currentPage])

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
        navigate(`${basename}/edit_campaign/${id}`);
     }

    const onNew = () => {

        navigate(`${basename}/edit_campaign/`);

     }

    return (
        <div className='displayObject'>

            {
                state === FormState.LIST && (
                    <ListOfCampaigns
                        Dictionary={CampaignDictionary}
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
        </div>
    )
}

export default Campaigns