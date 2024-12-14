import React, { useEffect, useState } from 'react'

const BackgroundForm = ({ resolution, saveImage, file, setFile, setMessage }) => {

    const [newImgFile, setNewImgFile] = useState(false);
    const [imgUrl, setImageUrl] = useState('');



    useEffect(() => {
        setNewImgFile(false);
        setImageUrl('');
        setFile('');
    }, [resolution, setFile])


    const loadFile = (event) => {
        if (event.target.files === null || event.target.files.length === 0) {
            return;
        }
        event.preventDefault();

        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setNewImgFile(true);
        setFile(event.target.files[0]);

    }

    function checkFile({ target: img }) {
        console.log('called checkFile');
        if (newImgFile && img.offsetHeight > 0 && img.offsetWidth > 0) {
            if (img.offsetHeight !== resolution.height || img.offsetWidth !== resolution.width) {
                setImageUrl('');
                setMessage('Image is outside requirements for this resolution: ' + resolution.width + ' x ' + resolution.height + '. Submited image has dimensions: ' + img.naturalWidth + ' x ' + img.naturalHeight);
                setNewImgFile(false);
                setFile('');
            }
            else {
                setMessage('');
                setNewImgFile(true);

            }
        }
    }

    const onSave = () => {
        saveImage(file);
        setFile('');
    }

    return (
        <div  className='formDisplay'>
            <div  className='formControl'>
                <label className="formLabel">Image:</label>
                <div className="formInput">
                    <input type="file" accept="image/*" className="form-control-plaintext" onChange={loadFile} />
                </div>
            </div>
            <div className='formControl'>
                {
                    imgUrl && (
                        <img src={imgUrl} alt="loadedImage" onLoad={checkFile} />
                    )
                }
            </div>
            <div className='formActionBar'>
                {
                    newImgFile &&  false && (
                        <div>
                            <button
                                onClick={onSave}
                            >Save</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BackgroundForm