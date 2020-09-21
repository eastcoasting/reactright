import React, {useState }from "react";
import Toggle from "react-toggle";
import {AiOutlineInfoCircle} from "react-icons/ai";
import Modal from "react-modal";
import {MdOpacity} from "react-icons/md";



const Layer = ({ onSliderChange,
                 sliderChangeValue,
                 onToggleChange,
                 layerTitle,
                 sourceDetails,
                 layerDescription}) => {


    const [hideSlider, setHideSlider] = useState(false)


    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        console.log('opened')
    }

    function closeModal(){
        setIsOpen(false);
    }

    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0 , 0.5)'
        },
        content: {
            position: 'absolute',
            zIndex: 1000,
            top: '30vh',
            left: '30vw',
            right: '30vw',
            bottom: '30vh',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
        }
    };
    Modal.setAppElement(document.getElementById('root'));



    return (
        <div style={{float:'left', width: '100%'}}>
        <label style={{float:'inherit',
            display: 'inline-block',
            'verticalAlign':'top',
            'width': '75%'}}>
            <Toggle
                icons={false}
                defaultChecked={false}
                onChange={onToggleChange}
            />
            <div id='label' style={{
                display: 'inline-block',
                'verticalAlign':'top',
                'width': '75%',
                'wordWrap': 'break-word'}}>
                {layerTitle}
            </div>
        </label>

        <span style={{float: 'right',
            width: '25%',
            display: 'inline-block',
            'verticalAlign': 'top'}}>
                              <span>
                                  <AiOutlineInfoCircle onClick={openModal}  />
                                  <Modal
                                      isOpen={modalIsOpen}
                                      onAfterOpen={afterOpenModal}
                                      onRequestClose={closeModal}
                                      style={modalStyles}
                                      contentLabel="Layer A"
                                  >
                                  <h1>{layerTitle}</h1>
                                      <h4>Description</h4>
                                        <p>{layerDescription}</p>
                                      <h4>Source</h4>
                                        <p>{sourceDetails}</p>
                                  </Modal>
                              </span>

                              <MdOpacity onClick={() => setHideSlider(!hideSlider)}/>
                          </span>

            {hideSlider ?
                <div className="map-overlay-inner">
                    <input
                        id="slider"
                        type="range"
                        min="0"
                        max="100"
                        value={sliderChangeValue}
                        onChange={onSliderChange}
                        step="0"
                        style={{width: '75%'}}
                    />
                    <span id="slider-value">{sliderChangeValue}%</span>
                </div>
                :
                null
            }

    </div>
    )


}

export default Layer;
