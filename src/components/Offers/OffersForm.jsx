import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import ObjectForm from '../CustomControl/ObjectForm'
import { OffersSearchDictionary } from '../CustomControl/TableDictionary'
import ControlTitle from '../CustomControl/ControlTitle';

const OffersForm = ({search, setSearch}) => {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        const getCampaigns = async () => {
            request.request('GET', '/api/v1/campaign/').then((res) => {
                setCampaigns([{"campaignId":0, "campaignName":"Any/All"},...res.data]);
                console.log(res.data);
            });
        };
        getCampaigns();
    }, [])



    return (
        <div>
            <ControlTitle title="Campaign Report" />
            <ObjectForm dictionary={OffersSearchDictionary}
                object={search}
                setObject={setSearch}
                // onSave={onSave}
                domains={[campaigns]}
            />
        </div>
    )
}

export default OffersForm