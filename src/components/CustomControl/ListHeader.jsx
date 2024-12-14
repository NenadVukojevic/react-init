import React from 'react'
import { SortOrder } from '../Util/FormStates'
import UP from '../../images/up.png'
import DOWN from '../../images/down.png'

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
                                    <img className='icon' src={UP} alt="▲" ></img>
                                )
                            }
                            {
                                header.id === sortId && sortOrder === SortOrder.DESC && (
                                    <img className='icon' src={DOWN} alt="▼" ></img>
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