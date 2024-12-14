import React from 'react'
import Pagination from '../CustomControl/Pagination'
import ListRow from '../CustomControl/ListRow'
import ListHeader from '../CustomControl/ListHeader'
import ControlTitle from '../CustomControl/ControlTitle'

const ListOfBinRanges = ({ Dictionary, objects, setSortOrder, onEdit, onNew, sortId, sortOrder, currentPage, setCurrentPage, pageCount }) => {
    return (
        <div>
            <ControlTitle title="List of Bin Ranges" />
            {
                typeof (onNew) === 'function' && (
                    <div className='addObject'>
                        <button onClick={onNew}>add</button>
                    </div>
                )
            }
            <div className='displaylist'>
                <ListHeader
                    headers={Dictionary}
                    setSortOrder={setSortOrder}
                    sortId={sortId}
                    sortOrder={sortOrder}
                />
                {
                    objects.map((object, index) => (
                        <ListRow
                            key={index}
                            headers={Dictionary}
                            row={object}
                            onEdit={onEdit}
                        />
                    ))
                }
                <Pagination totalPages={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}


export default ListOfBinRanges