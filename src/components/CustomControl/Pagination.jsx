import React from 'react'
import { getPageNumbers } from '../Util/util'

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const pages = getPageNumbers(totalPages, currentPage);
    return (
        <div className={`pagination${totalPages < 2 ? " hidden" : ""}`}>
            {
                currentPage > 1 && (
                    <div className='pageLink' key="-4" onClick={() => setCurrentPage(1)}>{"|<"}</div>

                )
            }
            {
                currentPage > 1 && (

                    <div className='pageLink' key="-3" onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</div>
                )
            }
            {
                pages.map((page, index)=>(
                    <div className='pageLink' key={index} onClick={() => setCurrentPage(page)}>{page}</div>
                    
                ))
            }
            {
                currentPage < totalPages && (
                    <div className='pageLink'  key="-2" onClick={() => setCurrentPage(currentPage + 1)}>{">"}</div>
                )
            }
            {
                currentPage < totalPages && (
                    <div className='pageLink'  key="-1" onClick={() => setCurrentPage(totalPages)}>{">|"}</div>
                )
            }
            <div>{`${currentPage} \\ ${totalPages}`}</div>
        </div>
    )
}

export default Pagination