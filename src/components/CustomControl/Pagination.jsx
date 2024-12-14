import React from 'react'
import { getPageNumbers } from '../Util/util'
import PREV from '../../images/prev.png'
import NEXT from '../../images/next.png'
import FIRST from '../../images/first.png'
import LAST from '../../images/last.png'

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const pages = getPageNumbers(totalPages, currentPage);
    return (
        <div className={`pagination${totalPages < 2 ? " hidden" : ""}`}>
            {
                currentPage > 1 && (
                    <div className='pageLink' key="-4" onClick={() => setCurrentPage(1)}>
                        <img className='icon' src={FIRST} alt='|<'></img>
                    </div>

                )
            }
            {
                currentPage > 1 && (

                    <div className='pageLink' key="-3" onClick={() => setCurrentPage(currentPage - 1)}>
                        <img className='icon' src={PREV} alt='<'></img>
                    </div>
                )
            }
            {
                pages.map((page, index)=>(
                    <div className='pageLink' key={index} onClick={() => setCurrentPage(page)}>{page}</div>
                    
                ))
            }
            {
                currentPage < totalPages && (
                    <div className='pageLink'  key="-2" onClick={() => setCurrentPage(currentPage + 1)}>
                        <img className='icon' src={NEXT} alt='>'></img>
                    </div>
                )
            }
            {
                currentPage < totalPages && (
                    <div className='pageLink'  key="-1" onClick={() => setCurrentPage(totalPages)}>
                        <img className='icon' src={LAST} alt='>|'></img>
                    </div>
                )
            }
            <div>{`${currentPage} \\ ${totalPages}`}</div>
        </div>
    )
}

export default Pagination