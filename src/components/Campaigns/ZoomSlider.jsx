import React from 'react'

const ZoomSlider = ({ zoomScale, setZoomScale }) => {

    const handleChange = (event) => {
        setZoomScale(event.target.value);
    };

    return (
        <div className='slider_control'>
            <input
                type="range"
                min="0.5"
                max="1"
                value={zoomScale}
                className="slider"
                id="myRange"
                step="0.1"
                onChange={handleChange}
            ></input>
            <div>
                {zoomScale}
            </div>
        </div>
    )
}

export default ZoomSlider