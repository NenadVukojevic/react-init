import React from 'react'
import ListHeader from './ListHeader'
import ListRow from './ListRow'
import Pagination from './Pagination'
import ControlTitle from './ControlTitle'

const ListOfOptions = ({ Dictionary, objects, setSortOrder, onEdit, sortId, sortOrder, currentPage, setCurrentPage, pageCount, title }) => {
    return (
        <div>
            <ControlTitle title={title} />
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

export default ListOfOptions