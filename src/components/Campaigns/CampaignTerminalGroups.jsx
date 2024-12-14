import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import ControlTitle from '../CustomControl/ControlTitle'
import DualListPane from '../CustomControl/DualListPane'
import { SortOrder } from '../Util/FormStates';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';
import { TerminalGroupDictionaryAvailable, TerminalGroupDictionarySelected, TerminalPreviewDictionary } from '../CustomControl/TableDictionary';
import ListOfTerminals from '../Terminals/ListOfTerminals';

const CampaignTerminalGroups = ({ object, setObject, title, setDirty }) => {
    const [available, setAvailable] = useState([]);
    const [selected, setSelected] = useState([]);
    const [terminalGroups, setTerminalGroups] = useState([]);
    const [terminals, setTerminals] = useState([]);
    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);
    const [selectedTerminals, setSelectedTerminals] = useState([]);
    const rowsPerPage = 10;


    useEffect(() => {

        const getTerminals = async () => {
            request.request('GET', '/api/v1/terminals/').then((res) => {
                setTerminals(res.data);
                console.log(res.data);
            });
        }
        getTerminals();
    }, []);

    useEffect(() => {
        const found = terminals.filter((obj) => selectedTerminals.includes(obj.terminalId));
        const paginator = new Paginator(found.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(found, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [terminals, sortRules, currentPage, selectedTerminals])



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

    useEffect(() => {
        const getTerminalGroup = async () => {
            request.request('GET', '/api/v1/terminals/terminalGroupDTO').then((res) => {
                setTerminalGroups(res.data);
                console.log(res.data);
            });
        }
        getTerminalGroup();
    }, []);

    useEffect(() => {

        const filteredAvailable = terminalGroups.filter((obj) => !object.terminalGroups.includes(obj.terminalGroupId));
        setAvailable(filteredAvailable);
        const filteredSelected = terminalGroups.filter((obj) => object.terminalGroups.includes(obj.terminalGroupId));
        setSelected(filteredSelected);




    }, [object.terminalGroups, terminalGroups]);


    useEffect(() => {
        setSelectedTerminals(getUniqueMembers(terminalGroups, selected.map(obj => obj.terminalGroupId)));


    }, [selected, terminalGroups])


    const getUniqueMembers = (objectList, idList) => {
        // Filter objects where id is in idList
        const filteredObjects = objectList.filter(obj => idList.includes(obj.terminalGroupId));

        // Extract members and combine them into a single array
        const allMembers = filteredObjects.flatMap(obj => obj.members);

        // Create a Set to get unique members
        const uniqueMembers = [...new Set(allMembers)];

        console.log("uniqueMembers", objectList, idList);
        return uniqueMembers;
    };

    const onAdd = (id) => {
        setObject((prevObject) => ({
            ...prevObject, // Spread the previous object to retain other properties
            terminalGroups: [...prevObject.terminalGroups, id], // Add new member to the array
        }));
        setDirty(true);
    }

    const onRemove = (id) => {
        setObject((prevObject) => ({
            ...prevObject, // Retain other properties
            terminalGroups: prevObject.terminalGroups.filter((member) => member !== id), // Remove the specific member
        }));
        setDirty(true);
    }

    const onEdit = (id) => {

    }
    return (
        <div>
            <ControlTitle title={title} />
            <div className='dualList'>
                <div>
                    <DualListPane Dictionary={TerminalGroupDictionaryAvailable}
                        objects={available}
                        onEdit={onAdd}
                        title="Available"
                    />
                </div>
                <div><DualListPane
                    Dictionary={TerminalGroupDictionarySelected}
                    objects={selected}
                    onEdit={onRemove}
                    title="Selected"
                />
                </div>
                <div>
                    <ListOfTerminals
                        Dictionary={TerminalPreviewDictionary}
                        terminals={displayPage}
                        setSortOrder={setSortOrder}
                        onEdit={onEdit}
                        sortId={sortRules.sortId}
                        sortOrder={sortRules.sortOrder}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageCount={pageCount}
                    />
                </div>
            </div>
        </div>
    )
}

export default CampaignTerminalGroups