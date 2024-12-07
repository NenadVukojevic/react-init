import React from 'react'

const EditCampaignHeader = ({ title, onSave, dirty }) => {
  return (
    <div className='editCampaignHeader'>
    <div className='title'>{title}</div>
    <div className='button'>
        <button type="button" disabled={!dirty} className="btn btn-secondary mr-2" onClick={onSave}>Save</button>
    </div>
</div>

  )
}

export default EditCampaignHeader