import React, {useRef, useState, useEffect, setState} from "react";
import Plotly from "plotly.js"
import Select from 'react-select'

import createPlotlyComponent from 'react-plotly.js/factory';
import {useQuery} from "react-query";
import { ReactQueryDevtools} from 'react-query-devtools';

const Plot = createPlotlyComponent(Plotly);



export const PlotEIA = ({
                                 heightP,
                                 widthP,
                                 barColorInput,
                                 onClick
                             }) => {



    const dataChartNode = useRef();

    const options = [
        { value: 'NG.N3035ME3.M' , label:'Natural Gas', axisLabel: 'none'  },
        { value: 'ELEC.PRICE.ME-ALL.Q', label:  'Electricity', axisLabel: 'none'}
    ];

    const initialFormState = { mySelectKey: "ELEC.PRICE.ME-ALL.Q" };

    const [myForm, setMyForm] = useState(initialFormState);

    const updateForm = value => {
        setMyForm({ ...myForm, mySelectKey: value });
    };




    const { data } = useQuery(`${myForm.mySelectKey}`, () =>
        fetch(
            `https://api.eia.gov/series/?api_key=84b2ffa162be7397b1aa46838f3f89bb&series_id=${myForm.mySelectKey}`
        ).then((res) => res.json()
        ),
        {refetchOnMount : false}
    );







    const [stateX, setStateX] = React.useState([])

    React.useEffect(() => {

        if (!data) {
        } else {

            if (data) {

                setStateX(data.series[0].data.map(x => x[1]))

            }
        }
    }, [data])



    const [stateY, setStateY] = React.useState([])

    React.useEffect(() => {
            if (!data) {
            } else {

                if (data) {


                    setStateY(data.series[0].data.map(x => x[0]))

                }
            }
    }, [data])



    const chartData = [
        {
            x: stateY,
            y: stateX,
            type: 'line',
            marker: {color: barColorInput},
            showlegend: true,
            xaxis: "Average retail price of electricity",
            yaxis: "cents per kilowatthour"
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


        <Plot
            ref={dataChartNode}
            data={chartData}
            layout={{
                height: heightP,
                width: widthP,
                title: `Average retail price of ${myForm.mySelectKey} - Maine`,
                legend: {
                    orientation: "v"
                },
                yaxis: {
                    title: "Average retail price of electricity (USD)"},



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
        <ReactQueryDevtools initialIsOpen={false}/>
        </div>


    );
}