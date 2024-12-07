import React from 'react'

const ResolutionPicker = ({ resolutions, setResolutionId, resolutionId }) => {

    function handleChange(ev) {
        console.log("handle change resolution picker", ev.target.value);
        setResolutionId(ev.target.value);
    }
    return (



                <select className="form-control"
                    onChange={handleChange}
                    value={resolutionId}
                >
                    <option value="0" key="0">rezolucija</option>

                    {resolutions.map((resolution) => (
                        <option value={resolution.resolutionId}
                            key={resolution.resolutionId}
                        >
                            {resolution.resolutionValue}
                        </option>
                    ))}
                </select>
    )
}

export default ResolutionPicker