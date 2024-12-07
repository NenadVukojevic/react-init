import React from 'react'
import ControlTitle from '../CustomControl/ControlTitle'
import ListHeader from '../CustomControl/ListHeader'
import ListRow from '../CustomControl/ListRow'
import Pagination from '../CustomControl/Pagination'

const ListOfTerminals = ({ Dictionary, terminals, setSortOrder, onEdit, onNew, sortId, sortOrder, currentPage, setCurrentPage, pageCount }) => {


    return (
        <div>
            <ControlTitle title="List of Terminals" />
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
                    terminals.map((terminal, index) => (
                        <ListRow
                            key={index}
                            headers={Dictionary}
                            row={terminal}
                            onEdit={onEdit}
                        />
                    ))
                }
                <Pagination totalPages={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

export default ListOfTerminals