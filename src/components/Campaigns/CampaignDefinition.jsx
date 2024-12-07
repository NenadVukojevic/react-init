import React, { useEffect, useState } from 'react'
import request from '../Util/AxiosWrapper';
import ControlTitle from '../CustomControl/ControlTitle';
import BackgroundPicker from '../AtmBackground/BackgroundPicker';
import { appPath } from '../Util/Constants';
import ZoomSlider from './ZoomSlider';
import AvailableButtons from './AvailableButtons';
import LinkButtons from './LinkButtons';

import './CampaignDefinition.css';

const CampaignDefinition = ({ responses, definition, setDefinition, onSave, collecting, campaignText }) => {

    const [used, setUsed] = useState(new Set());
    const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
    const [showBackgroundPickerConfirmation, setShowBackgroundPickerConfirmation] = useState(false);

    const [template, setTemplate] = useState({});
    const [backgrounds, setBackgrounds] = useState([]);
    const [zoomScale, setZoomScale] = useState(1);
    const [zoomScaleConfirmation, setZoomScaleConfirmation] = useState(1);

    const [activeTab, setActiveTab] = useState(0);


    const idType = 'string';

    useEffect(() => {
        const getTemplateDTO = (id) => {
            request.request('GET', '/api/v1/template/dto/' + id).then((res) => {
                console.log("template", res.data);
                setTemplate(res.data)
            });
        }


        getTemplateDTO(definition.resolutionId);
    }, [definition])


    useEffect(() => {
        // List of used responses
        setUsed(new Set());
        // hide all elements that have been used from the List of available buttons
        template?.elements?.forEach(element => {
            addUsed(definition[element.name.toLowerCase()]);

        })

    }, [definition, template]);

    useEffect(() => {
        const getBackgrounds = (id) => {
            request.request('GET', '/api/v1/campaign/atmBackground/resolution/ids/' + id).then((res) => {
                setBackgrounds(res.data.sort((a, b) => b - a));
            });
        }
        getBackgrounds(definition.resolutionId);
    }, [definition?.resolutionId])

    useEffect(() => {
        function zoomOut() {

            var zoomedDiv = document.getElementById(`zoomedDid_${definition?.resolutionId}`);
            if (zoomedDiv) {
                zoomedDiv.style.transformOrigin = '0 0';
                zoomedDiv.style.transform = `scale(${zoomScale})`; // Adjust the scale factor as needed
            }
        }
        zoomOut();

    }, [zoomScale, definition?.resolutionId]);

    useEffect(() => {
        function zoomOut() {

            var zoomedDiv = document.getElementById(`zoomedCid_${definition?.resolutionId}`);
            if (zoomedDiv) {
                zoomedDiv.style.transformOrigin = '0 0';
                zoomedDiv.style.transform = `scale(${zoomScaleConfirmation})`; // Adjust the scale factor as needed
            }
        }
        zoomOut();

    }, [zoomScaleConfirmation, definition?.resolutionId]);

    const addUsed = (value) => {
        if (value !== '') {
            setUsed(prev => new Set(prev.add(value)));
        }
    };

    const removeUsed = (value) => {
        let nUsed = new Set();
        for (let val of used) {

            if (val !== value) {
                nUsed.add(val);
            }

        }
        setUsed(nUsed);
    };

    function allowDrop(ev) {
        ev.preventDefault();
        ev.target.style.background = 'red';
    }

    function restoreStyle(ev) {
        ev.target.style.background = 'rgba(200, 200, 200, 0.3)';
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);

    }

    function removeButton(ev) {
        ev.preventDefault();

        ev.target.style.background = 'rgba(200, 200, 200, 0.3)';

        removeUsed(definition[ev.target.id]);
        if (idType === "number") {
            setDefinition({ ...definition, [ev.target.id]: 0 });
        }
        else {
            setDefinition({ ...definition, [ev.target.id]: '' });
        }
    }

    function drop(ev) {
        ev.preventDefault();
        ev.target.style.background = 'rgba(200, 200, 200)';
        console.log("drop", ev, typeof (ev.dataTransfer.getData("text")), ev.dataTransfer.getData("text"));
        var data = idType === "number" ? parseInt(ev.dataTransfer.getData("text")) : ev.dataTransfer.getData("text");

        setDefinition({ ...definition, [ev.target.id]: data });
        addUsed(data);
    }

    function getLabel(id) {
        if (id === null || id === 0) {
            return '';
        }
        let response = responses.filter(r => { return String(r.responseId) === String(id) });
        let label = '';

        if (response.length !== 0) {

            label = response[0].responseLabel;
        }
        return label;
    }

    const onPickerChoice = (id) => {
        setDefinition({ ...definition, imageId: id })
        setShowBackgroundPicker(false);
    }

    const onPickerChoice2 = (id) => {
        setDefinition({ ...definition, confirmationImageId: id })
        setShowBackgroundPickerConfirmation(false);
    }

    const getCampaignMessageStyle = () => {
        var res = template?.elements?.find(element => {
            return element.elementName === 'campaignMessage';
        });

        if (res !== undefined) {
            let reducedStyles = res.properties.reduce((styleObject, item) => {
                styleObject[item.propertyName] = item.propertyValue;
                return styleObject;
            }, {});

            return reducedStyles;
        }

        return null;
    }


    var styleText = getCampaignMessageStyle();

    const getElementStyle = (elementName) => {
        var res = template?.elements?.find(element => {
            return element.elementName === elementName;
        });

        if (res !== undefined) {
            let reducedStyles = res.properties.reduce((styleObject, item) => {
                styleObject[item.propertyName] = item.propertyValue;
                return styleObject;
            }, {});

            return reducedStyles;
        }

        return null;
    }

    var styleConfirmationText = getElementStyle('confirmationText');
    var styleCollectingInput = getElementStyle('collectingInput');

    const onClickLinkButton = (id) => {
        console.log("onClickLinkButton", id);
        setDefinition({ ...definition, confirmationBtn: id })

    }

    const onClickButton = (button) => {
        const buttonId = definition[(button.name).toLowerCase()]
        console.log("onClickButton", buttonId);
        var newValue = buttonId;
        if (definition.confirmationBtn === buttonId) {
            newValue = "";
        }

        //setDefinition({ ...definition, confirmationBtn: buttonId })
        setDefinition({ ...definition, confirmationBtn: newValue })

    }

    const isSelected = (button) => {
        var response = "indicator";
        const buttonId = definition[(button.name).toLowerCase()]
        if (definition.confirmationBtn === buttonId || (definition.confirmationBtn)?.toString() === (buttonId).toString()) {
            response = "indicator_selected";
        }
        return response;
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className='campaign_definition'>
                <div>
                    <ControlTitle title={`Screen definition for ${template.width}x${template.height}`} />
                </div>
                <div className="tab-container">
                    <ul className="tabs">
                        <li
                            className={`tab-item ${activeTab === 0 ? "active" : ""}`}
                            onClick={() => handleTabClick(0)}
                        >
                            First Page
                        </li>
                        <li
                            className={`tab-item ${activeTab === 1 ? "active" : ""}`}
                            onClick={() => handleTabClick(1)}
                        >
                            Second Page
                        </li>
                    </ul>



                    <div className="tab-content">
                        {
                            (
                                <div className={activeTab === 0 ? '' : 'hidden'}>
                                    <div>
                                        <ControlTitle title="Campaign Offer" />
                                    </div>
                                    <div className="details_preview">
                                        <div className="details_responses">
                                            <AvailableButtons
                                                responses={responses}
                                                used={used}
                                                drag={drag} />
                                        </div>
                                        <div className="details_background">

                                            {
                                                showBackgroundPicker && (
                                                    <div className='formControl'>
                                                        <div className="col-sm-2">
                                                            <button className='form-control' onClick={() => setShowBackgroundPicker(false)}>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            {
                                                showBackgroundPicker && (
                                                    <div className="mb-3 row">
                                                        <BackgroundPicker
                                                            backgrounds={backgrounds}
                                                            onClick={onPickerChoice}
                                                            choosenImage={definition.imageId}
                                                        />
                                                    </div>
                                                )
                                            }
                                            {
                                                !showBackgroundPicker && (
                                                    <div className='formControl'>
                                                        <label className='formLabel'>Background Url:</label>
                                                        <div className='formInput'>
                                                            <button className='form-control' onClick={() => setShowBackgroundPicker(true)}>
                                                                ...
                                                            </button>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            <div className="mb-3 row">
                                                {/*
                                    <label className="col-sm-2 col-form-label">Add Text:</label>
                                    <div className="col-sm-10" >
                                        <textarea id="campaignText"
                                            style={{ float: 'left' }}
                                            rows="3"
                                            cols="50"
                                            type="text"
                                            value={definition.campaignText || ''}
                                            onChange={(event) => { setDefinition({ ...definition, campaignText: event.currentTarget.value }) }}
                                        />
                                    </div>
                                    
                                    */}
                                            </div>
                                            <div className="formControl">
                                                <label className="formLabel">Zoom Preview:</label>
                                                <div className="formInput">
                                                    <ZoomSlider
                                                        zoomScale={zoomScale}
                                                        setZoomScale={setZoomScale}
                                                    />
                                                </div>
                                            </div>
                                            <div id={`zoomedDid_${definition?.resolutionId}`}
                                                className="atm_screen"
                                                style={{
                                                    borderBottom: "10px solid silver"
                                                    , borderLeft: "12px solid gray"
                                                    , borderTop: "12px solid gray"
                                                    , borderRight: "10px solid silver"
                                                    , borderRadius: "5px"
                                                    , height: template?.height ? template?.height : 20
                                                    , width: template?.width ? template?.width : 20
                                                }
                                                }
                                            >
                                                <div className="atm_background"
                                                    style={{
                                                        height: template?.height
                                                        , width: template?.width
                                                    }}
                                                >
                                                    {
                                                        definition.imageId && (
                                                            <img className='atm_background'
                                                                // style={{"position":"fixed", "top":"5px", "left":"5px"}}
                                                                alt={"imga"}
                                                                src={`${appPath}/auth/atmBackground/${definition.imageId}`}
                                                            />
                                                        )
                                                    }


                                                    {


                                                    }



                                                    <div className="camp_message" style={styleText}>

                                                        {campaignText && (campaignText)}

                                                    </div>
                                                    {

                                                        template?.elements?.filter((element) => element.elementName === 'button').map((button) => {
                                                            let reducedStyles = button.properties.reduce((styleObject, item) => {
                                                                styleObject[item.propertyName] = item.propertyValue;
                                                                return styleObject;
                                                            }, {});

                                                            return (
                                                                definition[button.name.toLowerCase()] === '' || definition[button.name.toLowerCase()] === null || definition[button.name.toLowerCase()] === 0 ?

                                                                    <div key={button.id}
                                                                        className='holder'
                                                                        style={{ ...reducedStyles, background: "rgba(200, 200, 200, 0.3)" }}
                                                                        id={button.name.toLowerCase()}
                                                                        onDrop={drop}
                                                                        onDragOver={allowDrop}
                                                                        onDragLeave={restoreStyle}
                                                                    >
                                                                    </div>
                                                                    :
                                                                    <div key={button.id}
                                                                        className={`holder_button`}
                                                                        style={{ ...reducedStyles, background: "rgba(200, 200, 200)" }}
                                                                        id={button.name.toLowerCase()}
                                                                        onDoubleClick={removeButton}
                                                                        onClick={() => { onClickButton(button) }}>
                                                                        <div className={isSelected(button)}></div>
                                                                        {getLabel(definition[button.name.toLowerCase()])}
                                                                    </div>
                                                            )

                                                        }
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {



                            (


                                <div className={activeTab === 1 ? '' : 'hidden'}>
                                    <div>
                                        <ControlTitle title="Confirmation Screen" />
                                    </div>
                                    <div className="details_preview">
                                        <div className="details_responses">
                                            <LinkButtons
                                                responses={responses}
                                                used={used}
                                                onClick={onClickLinkButton}
                                                selected={definition.confirmationBtn} />
                                        </div>
                                        <div className="details_background">
                                            {
                                                showBackgroundPickerConfirmation && (
                                                    <div className="mb-3 row">
                                                        <div className="col-sm-2">
                                                            <button className='form-control' onClick={() => setShowBackgroundPickerConfirmation(false)}>
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            {
                                                showBackgroundPickerConfirmation && (
                                                    <div className="mb-3 row">
                                                        <BackgroundPicker
                                                            backgrounds={backgrounds}
                                                            onClick={onPickerChoice2}
                                                            choosenImage={definition.confirmationImageId}
                                                        />
                                                    </div>
                                                )
                                            }
                                            {
                                                !showBackgroundPickerConfirmation && (
                                                    <div className="formControl">
                                                        <label className="formLabel">Background Url:</label>
                                                        <div className="formInput">
                                                            <button className='form-control' onClick={() => setShowBackgroundPickerConfirmation(true)}>
                                                                ...
                                                            </button>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                            <div className="formControl">
                                                <label className="formLabel">Add Text:</label>
                                                <div className="formInput" >
                                                    <textarea id="confirmationText"
                                                        style={{ float: 'left' }}
                                                        rows="3"
                                                        cols="50"
                                                        type="text"
                                                        value={definition.confirmationText || ''}
                                                        onChange={(event) => { setDefinition({ ...definition, confirmationText: event.currentTarget.value }) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="formControl">
                                                <label className="formLabel">Zoom Preview:</label>
                                                <div className="formInput">
                                                    <ZoomSlider
                                                        zoomScale={zoomScaleConfirmation}
                                                        setZoomScale={setZoomScaleConfirmation}
                                                    />
                                                </div>
                                            </div>
                                            <div id={`zoomedCid_${definition?.resolutionId}`}
                                                className="atm_screen"
                                                style={{
                                                    borderBottom: "10px solid silver"
                                                    , borderLeft: "12px solid gray"
                                                    , borderTop: "12px solid gray"
                                                    , borderRight: "10px solid silver"
                                                    , borderRadius: "5px"
                                                    , height: template?.height ? template?.height : 20
                                                    , width: template?.width ? template?.width : 20
                                                }
                                                }
                                            >
                                                <div className="atm_background"
                                                    style={{
                                                        height: template?.height
                                                        , width: template?.width
                                                    }}
                                                >
                                                    {
                                                        definition.confirmationImageId && (
                                                            <img className='atm_background'
                                                                alt={"img confirmation"}
                                                                src={`${appPath}/auth/atmBackground/${definition.confirmationImageId}`}
                                                            />
                                                        )
                                                    }

                                                    <div className="camp_message" style={styleConfirmationText}>

                                                        {definition && (definition.confirmationText)}

                                                    </div>

                                                    {
                                                        collecting && (
                                                            <div className='camp_message' style={styleCollectingInput}>
                                                                <input type="text"></input>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >



    )

}

export default CampaignDefinition