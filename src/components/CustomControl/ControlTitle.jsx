import React from 'react';

function ControlTitle(props) {
    return (
        <div className="controlTitle">
            <span style={{float:'left'}}>{props.title}</span>
        </div>
    );
}

export default ControlTitle;