import React from 'react'
import { SortOrder } from '../Util/FormStates'

const ListHeader = ({ headers, setSortOrder, sortId, sortOrder }) => {
    return (
        <div className='header'>
            {
                headers.map((header, index) => (
                    header.listType === "show" && (
                        <div
                            className='title'
                            style={{ width: header.width }}
                            key={index}
                            onClick={() => setSortOrder(header.id)}>
                            {header.title}
                            {
                                header.id === sortId && sortOrder === SortOrder.ASC && (
                                    <>▲</>
                                )
                            }
                            {
                                header.id === sortId && sortOrder === SortOrder.DESC && (
                                    <>▼</>
                                )
                            }
                        </div>
                    )
                ))
            }
        </div>
    )
}

export default ListHeader