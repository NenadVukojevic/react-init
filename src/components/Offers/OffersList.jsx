import React, { useEffect, useState } from 'react'
import ListHeader from '../CustomControl/ListHeader'
import ListRow from '../CustomControl/ListRow'
import Pagination from '../CustomControl/Pagination'
import { SortOrder } from '../Util/FormStates'
import { Paginator } from '../CustomControl/Paginator'
import { sortArray } from '../Util/util'

const OffersList = ({ Dictionary, objects }) => {

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

        <div>
            {

                objects.length > 0 && (
                    <div className='displaylist'>
                        <ListHeader
                            headers={Dictionary}
                            setSortOrder={setSortOrder}
                            sortId={sortRules.sortId}
                            sortOrder={sortRules.sortOrder}
                        />
                        {
                            displayPage.map((object, index) => (
                                <ListRow
                                    key={index}
                                    headers={Dictionary}
                                    row={object}
                                />
                            ))
                        }
                        <Pagination totalPages={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                )
            }
        </div>
    )
}

export default OffersList