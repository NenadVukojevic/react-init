import React, { useEffect, useState } from 'react'
import { SortOrder } from '../Util/FormStates';
import { Paginator } from './Paginator';
import { sortArray } from '../Util/util';
import ListOfOptions from './ListOfOptions';

const DualListPane = ({ Dictionary, objects, onEdit, title }) => {

    const [sortRules, setSortRules] = useState({ "sortId": "", "sortOrder": SortOrder.ASC });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [displayPage, setDisplayPage] = useState([]);

    const rowsPerPage = 10;
    useEffect(() => {
        const paginator = new Paginator(objects.length, rowsPerPage, currentPage);
        setPageCount(paginator.getTotalPages());
        const rowRange = paginator.getRowRange();
        const sorted = sortArray(objects, sortRules.sortId, sortRules.sortOrder);
        setDisplayPage(sorted.slice(rowRange.startRow, rowRange.endRow));
    }, [objects, sortRules, currentPage])



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
    return (
        <ListOfOptions
            Dictionary={Dictionary}
            objects={displayPage}
            setSortOrder={setSortOrder}
            onEdit={onEdit}
            sortId={sortRules.sortId}
            sortOrder={sortRules.sortOrder}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            title={title}
        />
    )
}

export default DualListPane