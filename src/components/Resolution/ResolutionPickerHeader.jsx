import React from 'react'
import ResolutionPicker from '../AtmBackground/ResolutionPicker'

const ResolutionPickerHeader = ({ resolutions, setResolutionId, resolutionId, addUsedResolution }) => {
  return (
    <div className='formControl'>
      <div className='formLabel'>
        Resolution
      </div>
      <div className='formInput'>
        <ResolutionPicker
          resolutions={resolutions}
          resolutionId={resolutionId}
          setResolutionId={setResolutionId}
        />
      </div>
    <div>
      <button onClick={addUsedResolution}>Add</button>
    </div>
    </div>
  )
}

export default ResolutionPickerHeader