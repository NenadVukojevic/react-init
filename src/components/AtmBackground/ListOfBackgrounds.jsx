import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import BackgroundPicker from './BackgroundPicker';
import './Background.css';
import ResolutionPicker from './ResolutionPicker';
import BackgroundForm from './BackgroundForm';
import { FormState } from '../Util/FormStates';


const ListOfBackgrounds = () => {

    const [resolutions, setResolutions] = useState([]);
    const [resolution, setResolution] = useState({});
    const [resolutionId, setResolutionId] = useState(1);
    const [backgrounds, setBackgrounds] = useState([]);
    const [choosenImage, setChoosenImage] = useState(0);
    const [state, setState] = useState(FormState.LIST);
    const [file, setFile] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getResolutions = (id) => {
            request.request('GET', '/api/v1/campaign/resolutions').then((res) => {
                setResolutions(res.data.sort((a, b) => a.resolutionId - b.resolutionId));
                console.log(res.data);
            });
        }


        getResolutions();
    }, [])

    useEffect(() => {
        const getBackgrounds = (id) => {
            request.request('GET', '/api/v1/campaign/atmBackground/resolution/ids/' + id).then((res) => {
                setBackgrounds(res.data.sort((a, b) => b - a));
                setChoosenImage(res.data[0]);
                console.log(res.data);
            });
        }


        getBackgrounds(resolutionId);
    }, [resolutionId])



    useEffect(() => {
        const onResolutionChange = (id) => {
            const res = resolutions.find((resolution) => String(resolution.resolutionId) === String(id));
            setResolution(res);
            console.log('onResolutionChange', id, res);
        }
        onResolutionChange(resolutionId);
    }, [resolutions, resolutionId])

    const onCancel = () => {
        setState(FormState.LIST);
        setMessage('');
    }

    const onPickerChoice = (id) => {
        setChoosenImage(id);
        setMessage("");
    }


    const saveImage = () => {

        request.request('POST_FILE', '/api/v1/campaign/atmBackground', file).then((res) => {
            console.log(res.data);
            setResolutionId((resolutionId));
            setFile(null);
            addToBackgrounds(res.data.imageId);
            setChoosenImage(res.data.imageId);
            setState(FormState.LIST);
        });

    }

    const addToBackgrounds = (id) => {
        setBackgrounds(prev => ([id, ...prev]));
    }

    const removeFromBackgrounds = (id) => {
        let filteredBackground = backgrounds.filter(background => background !== id);
        setBackgrounds(filteredBackground);
    }

    const deleteImage = () => {
        console.log("deleteImage", choosenImage)
        request.request('DELETE', '/api/v1/campaign/atmBackground/' + choosenImage).then((res) => {
            removeFromBackgrounds(choosenImage);
            setChoosenImage(null);
            console.log(res);
        })
            .catch((err) => {
                setMessage(err.response?.data);
            })
            ;
    }

    return (
        <div className='background_container'>
            <div className='controlTitle'>
                Campaign Backgrounds
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Resolution:</label>
                <div className="col-sm-2">
                    <ResolutionPicker
                        resolutions={resolutions}
                        setResolutionId={setResolutionId}
                        resolutionId={resolutionId}
                    />

                </div>
            </div>
            {
                message && (
                    <div className='message'>
                        {message}
                    </div>
                )
            }
            <div >
                {
                    state === FormState.LIST &&
                    (

                        <button
                            type="button"
                            className="btn btn-secondary mr-2 mt-2"
                            onClick={() => setState(FormState.NEW)}
                        >Add</button>
                    )
                }
                {
                    state === FormState.LIST && choosenImage &&
                    (
                        <button
                            type="button"
                            className="btn btn-secondary mr-2 mt-2"
                            onClick={deleteImage}
                        >Delete</button>
                    )
                }
            </div>
            <div>
                {
                    state === FormState.NEW &&
                    (

                        <button
                            type="button"
                            className="btn btn-secondary mr-2 mt-2"
                            onClick={onCancel}
                        >Cancel</button>

                    )
                }
                {
                    file &&
                    (

                        <button
                            type="button"
                            className="btn btn-secondary mr-2 mt-2"
                            onClick={saveImage}
                        >Save</button>

                    )
                }
            </div>
            {
                state === FormState.LIST &&
                (
                    <div>
                        <BackgroundPicker
                            backgrounds={backgrounds}
                            onClick={onPickerChoice}
                            choosenImage={choosenImage}
                        />
                    </div>
                )
            }
            {
                state === FormState.NEW && (
                    <div>
                        <BackgroundForm
                            resolution={resolution}
                            saveImage={saveImage}
                            file={file}
                            setFile={setFile}
                            setMessage={setMessage}
                        />
                    </div>
                )
            }

        </div>
    )
}

export default ListOfBackgrounds