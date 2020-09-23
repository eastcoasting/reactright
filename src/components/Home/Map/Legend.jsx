import React, {useState }from "react";
import './legendStyle.css'

const Legend = ({ legendLayerTitle,
                  itemArray,
                  legendLayerFormat

                  }) => {



    return (
        <div className={Legend} >

            <div id="state-legend" className="legend">
                <h5>{legendLayerTitle}</h5><h7 style={{fontStyle: 'italic'}}>{legendLayerFormat}</h7>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
                {itemArray.map(itemArray => (
                        <div style={{textTransform: 'capitalize' }}><span style={{backgroundColor: itemArray[1] }}></span>{itemArray[0]} </div>
                    )
                )}
            </div>


            </div>

        </div>


    )


}

export default Legend;
