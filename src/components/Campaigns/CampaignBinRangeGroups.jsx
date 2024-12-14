import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import ControlTitle from '../CustomControl/ControlTitle'
import DualListPane from '../CustomControl/DualListPane'
import ListOfBinRanges from '../BinRanges/ListOfBinRanges';
import { BinRangeGroupDictionaryAvailable, BinRangeGroupDictionarySelected, BinRangesPreviewDictionary } from '../CustomControl/TableDictionary'
import { SortOrder } from '../Util/FormStates';
import { Paginator } from '../CustomControl/Paginator';
import { sortArray } from '../Util/util';

const CampaignBinRangeGroups = ({ object, setObject, title, setDirty }) => {
    const [available, setAvailable] = useState([]);
    const [selected, setSelected] = useState([]);
    const [binRangeGroups, setbinRangeGroups] = useState([]);
    const [binRanges, setBinRanges] = useState([]);
    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);
    const [selectedBinRanges, setSelectedBinRanges] = useState([]);
    const rowsPerPage = 10;


    useEffect(() => {

        const getBinRanges = async () => {
            request.request('GET', '/api/v1/binRanges/').then((res) => {
                setBinRanges(res.data);
                console.log(res.data);
            });
        }
        getBinRanges();
    }, []);

    useEffect(() => {
        const foundBinRanges = binRanges.filter((obj) => selectedBinRanges.includes(obj.binRangeId));
        const paginator = new Paginator(foundBinRanges.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(foundBinRanges, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [binRanges, sortRules, currentPage, selectedBinRanges])



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
        const getBinRangeGroups = async () => {
            request.request('GET', '/api/v1/binRanges/groupsWithMembers').then((res) => {
                setbinRangeGroups(res.data);
                console.log(res.data);
            });
        }
        getBinRangeGroups();
    }, []);

    useEffect(() => {

        const filteredAvailable = binRangeGroups.filter((obj) => !object.binRangesGroups.includes(obj.binRangeGroupId));
        setAvailable(filteredAvailable);
        const filteredSelected = binRangeGroups.filter((obj) => object.binRangesGroups.includes(obj.binRangeGroupId));
        setSelected(filteredSelected);




    }, [object.binRangesGroups, binRangeGroups]);


    useEffect(() => {
        setSelectedBinRanges(getUniqueMembers(binRangeGroups, selected.map(obj=>obj.binRangeGroupId)));


    }, [selected, binRangeGroups])


    const getUniqueMembers = (objectList, idList) => {
        // Filter objects where id is in idList
        const filteredObjects = objectList.filter(obj => idList.includes(obj.binRangeGroupId));

        // Extract members and combine them into a single array
        const allMembers = filteredObjects.flatMap(obj => obj.members);

        // Create a Set to get unique members
        const uniqueMembers = [...new Set(allMembers)];

        console.log("uniqueMembers", idList);
        return uniqueMembers;
    };

    const onAdd = (id) => {
        setObject((prevObject) => ({
            ...prevObject, // Spread the previous object to retain other properties
            binRangesGroups: [...prevObject.binRangesGroups, id], // Add new member to the array
        }));
        setDirty(true);
    }

    const onRemove = (id) => {
        setObject((prevObject) => ({
            ...prevObject, // Retain other properties
            binRangesGroups: prevObject.binRangesGroups.filter((member) => member !== id), // Remove the specific member
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
                    <DualListPane Dictionary={BinRangeGroupDictionaryAvailable}
                        objects={available}
                        onEdit={onAdd}
                        title="Available"
                    />
                </div>
                <div><DualListPane
                    Dictionary={BinRangeGroupDictionarySelected}
                    objects={selected}
                    onEdit={onRemove}
                    title="Selected"
                />
                </div>
                <div>
                    <ListOfBinRanges
                        Dictionary={BinRangesPreviewDictionary}
                        objects={displayPage}
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

export default CampaignBinRangeGroups