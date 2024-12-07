import React from 'react'

function AtmButton(props) {
    const { response, index, drag, onClick, selected } = props;
    return (
        <div className={`${selected === response.responseId ? 'atm_button container selectedLinkButton' : 'atm_button container'}`}
            id={response.responseId} draggable="true"
            onDragStart={drag}
            onDoubleClick={onClick}
        >
            <div style={{ padding: 2 }} className="row">{response.responseLabel}</div>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: 'white', padding: 2 }} className="row justify-content-end">{response.responseCode}</div>

        </div>
    )
}

export default AtmButton
