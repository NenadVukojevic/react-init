import React, { useEffect, useState } from 'react';
import { appPath } from '../Util/Constants.js'

const BackgroundPicker = ({ backgrounds, onClick, choosenImage }) => {
    const [position, setPosition] = useState(0);

    const imageToDisplay = 4;


    useEffect(() => {
      setPosition(0);
    }, [backgrounds])
    

    const goPrevious = () => {
        setPosition((position) => (position - 1 + backgrounds.length) % backgrounds.length);
    }

    const goNext = () => {
        setPosition((position) => (position + 1) % backgrounds.length);
    }

    const getImagesForDisplay = () => {
        
        var start = position % backgrounds.length;
        var end = (start + imageToDisplay) % backgrounds.length;

        if(imageToDisplay >= backgrounds.length)
        {
            start = 0;
            end = backgrounds.length;
        }

        if (end >= start) {
            return backgrounds.slice(start, end);
        }
        else {
            return [...backgrounds.slice(start), ...backgrounds.slice(0, end)];
        }

    }

    return (
        <div>
            <div className='choosen_image_preview'>
            {
                choosenImage && (
                    <img className='choosen_image'
                        alt={"imga"}
                        src={`${appPath}/auth/atmBackground/${choosenImage}`}
    
                    />
                )
            }
            </div>

            <div className='background_picker_control'>

                <div className='background_nav'
                    onClick={goPrevious}>
                    {"<"}
                </div>
                <div className='background_gallery_container'>


                    <div className='background_galery'>


                        {
                            getImagesForDisplay().map((id) =>

                            (<div
                                className='background_item'
                                key={id}>
                                <img className='background_item_image'
                                    alt={id}
                                    src={`${appPath}/auth/atmBackground/${id}`}
                                    onClick={() => onClick(id)}
                                />
                            </div>
                            )

                            )}

                    </div>
                    <div>
                        showing {position + 1} of {backgrounds.length}
                    </div>
                </div>
                <div className='background_nav'
                    onClick={goNext}>
                    {">"}
                </div>

            </div>
        </div>
    )
}

export default BackgroundPicker