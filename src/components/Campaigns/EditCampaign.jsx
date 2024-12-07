import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import { useParams } from 'react-router-dom';
import EditCampaignHeader from './EditCampaignHeader';
import CampaignForm from './CampaignForm';
import { CampaignDictionary } from '../CustomControl/TableDictionary';
import ControlTitle from '../CustomControl/ControlTitle';
import ResolutionPickerHeader from '../Resolution/ResolutionPickerHeader';
import CampaignDefinition from './CampaignDefinition';

const EditCampaign = () => {
    let { id } = useParams();
    const [resolutions, setResolutions] = useState([]);
    const [activeTab, setActiveTab] = useState("0");
    const [resolutionId, setResolutionId] = useState();
    const [newCampaign, setNewCampaign] = useState(true);
    const [responses, setResponses] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [binRangesGroup, setBinRangesGroup] = useState([]);
    const [terminalGroups, setTerminalGroups] = useState([]);
    const [selectedBinRange, setSelectedBinRange] = useState()
    const [campaign, setCampaign] = useState(
        {
            "campaignId": "",
            "campaignName": "",
            "campaignDescription": "",
            "campaignStart": "",
            "campaignEnd": "",
            "campaignStatus": false,
            "campaignText": "",
            "contactCollecting": false,
            "collectingText": "",
            "definitions": [],
        }
    );
    const [usedBinRangeGroups, setUsedBinRangesGroup] = useState([]);
    const [usedTerminalGroups, setUsedTerminalGroups] = useState([]);
    const [dirty, setDirty] = useState(false);

    const boolDomain = [
        {
            "id": 0,
            "value": "Y"
        }
        ,
        {
            "id": 1,
            "value": "N"
        }];


    useEffect(() => {
        if (id !== undefined) {
            request.request('GET', '/api/v1/campaign/' + id).then((res) => {
                setCampaign(res.data);
                setUsedBinRangesGroup(res.data.binRangesGroups);
                setUsedTerminalGroups(res.data.terminalGroups);
            });
            setNewCampaign(false);
        }
    }, [id]);

    useEffect(() => {
        const getResponses = (id) => {
            request.request('GET', '/api/v1/campaign/responses').then((res) => {
                setResponses(res.data);
            });
        }


        const getResolutions = (id) => {
            request.request('GET', '/api/v1/campaign/resolutions').then((res) => {
                setResolutions(res.data.sort((a, b) => a.resolutionId - b.resolutionId));
            });
        }

        const getStatuses = () => {
            request.request('GET', '/api/v1/campaign/statuses').then((res) => {
                setStatuses(res.data);
                console.log(res.data);
            });
        }

        getResponses();
        getResolutions();
        getStatuses();
    }, []);

    const saveCampaign = () => {

    }

    const getResolutionTitle = (id) => {
        var res = resolutions.find(resolution => {
            return resolution.resolutionId === id;
        });

        return "Screen " + res?.width.toString() + " x " + res?.height.toString();

    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const addUsedResolution = () => {

        //var exists = resolutions.some((resolution) => (resolution.resolutionId === parseInt(resolutionId)));

        //var exists = campaign.definitions.some((resolution) => (resolution.resolutionId === parseInt(resolutionId)));


        var newDefinition = {
            f1: '',
            f2: '',
            f3: '',
            f4: '',
            f5: '',
            f6: '',
            f7: '',
            f8: '',
            imageId: '',
            resolutionId: parseInt(resolutionId),
            campaignId: campaign.campaignId,
            campaignText: '',
            definitionId: 0
        };

        setCampaign((previous) => ({
            ...previous,
            definitions: [...previous.definitions, newDefinition],
        }
        ));

        setResolutionId(0);

    }

    const setDefinition = (id, newValue) => {
        // Update the state with the new value for the specified object
        console.log("setDefinition", id, newValue);

        setCampaign((previous) => ({
            ...previous,
            definitions: previous.definitions.map(
                (definition) =>
                    definition.resolutionId === id
                        ? newValue
                        : definition),
        }
        )
        );
        setDirty(true);

    }

    return (
        <div className='displayObject'>
            <div>
                <EditCampaignHeader title={campaign.campaignName} onSave={saveCampaign} dirty={dirty} />

                <div className="tab-container">
                    <ul className="tabs">
                        <li
                            className={`tab-item ${activeTab === "0" ? "active" : ""}`}
                            onClick={() => handleTabClick("0")}
                        >
                            General
                        </li>
                        {
                            campaign.definitions?.sort((a, b) => a.resolutionId - b.resolutionId).map((definition) => {
                                return (
                                    <li
                                        className={`tab-item ${activeTab === definition.resolutionId ? "active" : ""}`}
                                        onClick={() => handleTabClick(definition.resolutionId)}
                                    >
                                        {getResolutionTitle(definition.resolutionId)}
                                    </li>

                                )

                            }

                            )
                        }

                        <li
                            className={`tab-item ${activeTab === "14" ? "active" : ""}`}
                            onClick={() => handleTabClick("14")}
                        >
                            Bin Range Groups
                        </li>
                        <li
                            className={`tab-item ${activeTab === "15" ? "active" : ""}`}
                            onClick={() => handleTabClick("15")}
                        >
                            Terminal Groups
                        </li>
                    </ul>
                    <div className="tab-content">
                        {
                            activeTab === "0" &&
                            <div className="tab-panel">
                                <ResolutionPickerHeader
                                    resolutions={resolutions.filter(
                                        (resolution) =>
                                        (!campaign?.definitions?.some((definition) => (definition.resolutionId === resolution.resolutionId))
                                        ))}
                                    resolutionId={resolutionId}
                                    setResolutionId={setResolutionId}
                                    addUsedResolution={addUsedResolution}
                                />
                                <ControlTitle title="Campaign Data" />
                                <CampaignForm
                                    Dictionary={CampaignDictionary}
                                    object={campaign}
                                    setObject={setCampaign}
                                    domains={[statuses, boolDomain]}
                                />
                            </div>
                        }
                        {
                            campaign.definitions?.map((definition) => (
                                activeTab === definition.resolutionId && (
                                    <div className="tab-panel" key={definition.resolutionId}>
                                        <CampaignDefinition
                                            responses={responses}
                                            definition={definition}
                                            setDefinition={(newValue) => setDefinition(definition.resolutionId, newValue)}
                                            onSave={saveCampaign}
                                            collecting={campaign.contactCollecting}
                                            campaignText={campaign.campaignText}
                                        />

                                    </div>
                                )
                            )

                            )

                        }
                        {activeTab === "14" && <div className="tab-panel">Content for Tab 2</div>}
                        {activeTab === "15" && <div className="tab-panel">Content for Tab 3</div>}
                    </div>
                </div>
            </div>


        </div >
    )
}

export default EditCampaign