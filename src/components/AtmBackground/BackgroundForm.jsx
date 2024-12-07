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
                setMessage('Slika nije unutar predvidjenih dimenzija ' + resolution.width + ' x ' + resolution.height + '. Dimenzije su ' + img.naturalWidth + ' x ' + img.naturalHeight);
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
        <div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Image:</label>
                <div className="col-sm-10">
                    <input type="file" accept="image/*" className="form-control-plaintext" onChange={loadFile} />
                </div>
            </div>
            <div>
                {
                    imgUrl && (
                        <img src={imgUrl} alt="loadedImage" onLoad={checkFile} />
                    )
                }
            </div>
            <div>
                {
                    newImgFile &&  false && (
                        <div>
                            <button
                                type="button"
                                className="btn btn-secondary mr-2 mt-2"
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