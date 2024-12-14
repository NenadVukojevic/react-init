import React from 'react'
import ControlTitle from '../CustomControl/ControlTitle'
import ListHeader from '../CustomControl/ListHeader'
import ListRow from '../CustomControl/ListRow'
import Pagination from '../CustomControl/Pagination'

const ListOfTerminalGroups = ({ Dictionary, objects, setSortOrder, onEdit, onNew, sortId, sortOrder, currentPage, setCurrentPage, pageCount }) => {
    return (
        <div>
            <ControlTitle title="List of Terminal Groups" />
            <div className='addObject'>
                <button onClick={onNew}>add</button>
            </div>
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

export default ListOfTerminalGroups