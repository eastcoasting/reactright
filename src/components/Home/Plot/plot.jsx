import React, {useRef, useState} from "react";
import {ECL_data} from "./Data/data";
import Plotly from "plotly.js"
import Select from 'react-select'
import Collapsible from 'react-collapsible';
import { AiOutlineLineChart } from 'react-icons/ai';

import createPlotlyComponent from 'react-plotly.js/factory';


const Plot = createPlotlyComponent(Plotly);


export const PlotlyBarComponent = ({
                                 heightP,
                                 widthP,
                                 barColorInput,
                                 onClick
                             }) => {


    const dataChartNode = useRef();

    const options = [
        { value: 'line', label: 'Line' },
        { value: 'bar', label: 'Bar' }
    ];

    const initialFormState = { mySelectKey: 'line' };

    const [myForm, setMyForm] = useState(initialFormState);

    const updateForm = value => {
        setMyForm({ ...myForm, mySelectKey: value });
    };


    const chartData = [
        {
            x: [ECL_data()[0].id, ECL_data()[1].id, ECL_data()[2].id, ECL_data()[3].id, ECL_data()[4].id, ECL_data()[5].id, ECL_data()[6].id, ECL_data()[7].id, ECL_data()[8].id, ECL_data()[8].id, ECL_data()[9].id, ECL_data()[10].id, ECL_data()[11].id, ECL_data()[12].id, ECL_data()[13].id, ECL_data()[14].id, ECL_data()[15].id, ECL_data()[16].id, ECL_data()[17].id, ECL_data()[18].id, ECL_data()[19].id, ECL_data()[20].id, ECL_data()[21].id, ECL_data()[22].id, ECL_data()[23].id, ECL_data()[24].id],
            y: [ECL_data()[0].count, ECL_data()[1].count, ECL_data()[2].count, ECL_data()[3].count, ECL_data()[4].count, ECL_data()[5].count, ECL_data()[6].count, ECL_data()[7].count, ECL_data()[8].count, ECL_data()[9].count, ECL_data()[10].count, ECL_data()[11].count, ECL_data()[12].count, ECL_data()[13].count, ECL_data()[14].count, ECL_data()[15].count, ECL_data()[16].count, ECL_data()[17].count, ECL_data()[18].count, ECL_data()[19].count, ECL_data()[20].count, ECL_data()[21].count, ECL_data()[22].count, ECL_data()[23].count, ECL_data()[24].count],
            type: `${myForm.mySelectKey}`,
            marker: {color: barColorInput},
            showlegend: true,
            xaxis: "x",
            yaxis: "y"
        }
    ];



    return (

        <div className={"plot"} >
            <Collapsible  trigger={<AiOutlineLineChart
                          className={'chartIcon'}
                          size="40px" />}
                          open ={true}
            >

           <div className={"toggle"} style={{width: '150px'}}>
               <Select
                   name="mySelect"
                   value={options.filter(({ value }) => value === myForm.mySelectKey)}
                   getOptionLabel={({ label }) => label}
                   getOptionValue={({ value }) => value}
                   onChange={({ value }) => updateForm(value)}
                   options={options}
               />
           </div>

        <Plot
            ref={dataChartNode}
            data={chartData}
            layout={{
                height: heightP,
                width: widthP,
                title: "Area of ECLs",
                xaxis: { type: 'category' },
                legend: {
                    orientation: "h"
                },
                margin: {
                    b: 40,
                    t: 50,
                    l: 60,
                    r: 10
                }
            }}
            config={{
                displaylogo: false,
                // displayModeBar: true,
                modeBarButtonsToRemove: [
                    "lasso2d",
                    "autoScale2d", // 2D options
                    "toggleSpikelines",
                    "zoom2d",
                    "zoomIn2d",
                    "zoomOut2d",
                    "pan2d",
                    "hoverClosestCartesian",
                    "hoverCompareCartesian"
                ],
                responsive: true,
                // scrollZoom,
                showTips: false
            }}
            onClick={onClick}
        />
            </Collapsible>
        </div>


    );
}