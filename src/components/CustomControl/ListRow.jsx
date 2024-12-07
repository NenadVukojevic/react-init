import React from 'react'
import { resolveNestedAttribute } from '../Util/util';
import Active from '../../images/0.png'
import Inactive from '../../images/2.png'

const ListRow = ({ headers, row, onEdit }) => {

    return (
        <div className='listRow'>
            {

                headers.map((header, index) =>
                (header.listType === "show" &&
                    (
                        <div
                            key={index}
                            className='listElement'
                            style={{ width: header.width }}>
                            {
                                header.type === 'text' && resolveNestedAttribute(row, header.id)
                            }
                            {
                                header.type === 'button' && header.action === 'onEdit' &&
                                (
                                    <button onClick={() => onEdit(resolveNestedAttribute(row, header.id))}>
                                        edit
                                    </button>
                                )
                            }
                            {
                                header.type === 'boolean' && (
                                    resolveNestedAttribute(row, header.id) === false ? "N" : "Y"
                                )
                            }
                            {
                                header.type === 'signal' && (
                                    resolveNestedAttribute(row, header.id) === 1 ? <img src={Active} alt={"active"} /> : <img src={Inactive} alt={"Inactive"} />
                                )
                            }
                        </div>
                    ))
                )

            }
        </div>
    )
}

export default ListRow