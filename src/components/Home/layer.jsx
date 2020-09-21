import Toggle from "react-toggle";
import React, {useState} from "react";
import {AiOutlineInfoCircle} from "react-icons/ai";
import Modal from "react-modal";
import {MdOpacity} from "react-icons/md";
import Slider from "rc-slider";

import "./sliderStyles.css"


const Layer = ({ layerTitle }) => {


    const [value, setValue] = useState(100);


    return (

        <div className="map-overlay-inner"
             style={{width: '75%'}}>
            <Slider
                onChange={value => setValue(value)}
                value={value}
                min={0}
                max={100}
            />
            <span id="slider-value">{value}%</span>
        </div>


    )

}

export default Layer;
