import React, {useRef, useState} from "react";
import Plotly from "plotly.js"
import Select from 'react-select'

import createPlotlyComponent from 'react-plotly.js/factory';
import {useQuery} from "react-query";


const Plot = createPlotlyComponent(Plotly);



export const PlotEIA = ({
                                 heightP,
                                 widthP,
                                 barColorInput,
                                 onClick
                             }) => {

    const Xvalues = [];


    const {  data } = useQuery("repoData", () =>
        fetch(
            "https://api.eia.gov/series/?api_key=84b2ffa162be7397b1aa46838f3f89bb&series_id=ELEC.PRICE.ME-ALL.Q"
        ).then((res) => res.json()
            .then(
                function(data) {
                    console.log(data.series[0]);

         /*           for (var key in data.series[0].data) {
                        Xvalues.push(key);


                         console.log(Xvalues)
                    }*/

                    const data2 = data.series[0].data

                    let rows = data2.length
                    /*console.log(rows)
                    console.log(data2)
*/
                    for(let i=0; i<rows; i++){
                        let items = data2[i].length;
                        /*console.log(data2)*/
                        console.log(items);

                        for(let n=0; n<items; n++){
                            Xvalues.push(data2[i][n]);
/*
                            console.log(Xvalues);
*/


                        }
                    }



                }

            )

        )
    );















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
            x: [1],
            y: [2],
            type: `${myForm.mySelectKey}`,
            marker: {color: barColorInput},
            showlegend: true,
            xaxis: "x",
            yaxis: "y"
        }
    ];



    return (

        <div className={"plot"} >

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

            <div className="col-lg-5">

                {status === 'error' && (
                    <div>Error fetching data</div>
                )}

                {status === 'loading' && (
                    <div>Loading data...</div>
                )}

             {/*   {status === 'success' && (
                    <div>
                        {data.series.map(EIA => <div>{EIA.data}</div>)}
                    </div>
                )}*/}

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
/*
            onClick={onClick}
*/
        />
        </div>


    );
}