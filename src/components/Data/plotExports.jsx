import React, {useRef, useState, useEffect, setState} from "react";
import Plotly from "plotly.js"

import createPlotlyComponent from 'react-plotly.js/factory';
import {useQuery} from "react-query";
import census from "citysdk";

const Plot = createPlotlyComponent(Plotly);



export const PlotExports = ({
                            heightP,
                            widthP,
                            barColorInput,
                            onClick
                        }) => {



    const dataChartNode = useRef();


    function censusPromise(args) {
        return new Promise(function(resolve, reject) {
            census(args, function(err, json) {
                if (!err) {
                    resolve(json);
                } else {
                    reject(err);
                }
            });
        });
    }


    function getCensusExportsA() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statenaics"], // required
            values: ["NAICS", "ALL_VAL_YR"],
            predicates: {STATE:"ME", time: "from+2013-04", NAICS: "3219" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }

    function getCensusExportsB() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statenaics"], // required
            values: ["NAICS", "ALL_VAL_YR"],
            predicates: {STATE:"ME", time: "from+2013-04", NAICS: "3211" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }

    function getCensusExportsC() {
        return censusPromise({
            vintage: "timeseries", // required
            sourcePath: ["intltrade", "exports", "statenaics"], // required
            values: ["NAICS", "ALL_VAL_YR"],
            predicates: {STATE:"ME", time: "from+2013-04", NAICS: "3212" },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }

    function getAllExports() {
        return Promise.all([getCensusExportsA(), getCensusExportsB(), getCensusExportsC()])
            .then(data => data);
    }



    const { data } = useQuery('Exports', getAllExports);

    const [stateXSawmills, setStateXSawmills] = React.useState([])
    const [stateYSawmills, setStateYSawmills] = React.useState([])
    const setDataTableXSawmills = [];
    const setDataTableYSawmills = [];

    const [stateXVeneer, setStateXVeneer] = React.useState([])
    const [stateYVeneer, setStateYVeneer] = React.useState([])
    const setDataTableXVeneer = [];
    const setDataTableYVeneer = [];


    const [stateXOther, setStateXOther] = React.useState([])
    const [stateYOther, setStateYOther] = React.useState([])
    const setDataTableXOther = [];
    const setDataTableYOther = [];

    React.useEffect(() => {

        if (!data) {
        } else {
            const [Sawmills, Other, Veneer] = data;

            if (data) {

                for (var key in Sawmills) {
                    setDataTableYSawmills.push(Sawmills[key].time);
                    setDataTableXSawmills.push(Sawmills[key].ALL_VAL_YR);

                }
                setStateXSawmills(setDataTableXSawmills);
                setStateYSawmills(setDataTableYSawmills);

                for (var key in Veneer) {
                    setDataTableYVeneer.push(Veneer[key].time);
                    setDataTableXVeneer.push(Veneer[key].ALL_VAL_YR);

                }

                setStateXVeneer(setDataTableXVeneer);
                setStateYVeneer(setDataTableYVeneer);

                for (var key in Other) {
                    setDataTableYOther.push(Other[key].time);
                    setDataTableXOther.push(Other[key].ALL_VAL_YR);

                }

                setStateXOther(setDataTableXOther);
                setStateYOther(setDataTableYOther);
            }
        }
    }, [data])




    const chartData = [
        {
            x: stateYSawmills,
            y: stateXSawmills,
            type: 'line',
            name: 'Sawmills and wood<br>preservation',
            marker: {color: barColorInput},
            showlegend: true
        },
        {
            x: stateYVeneer,
            y: stateXVeneer,
            type: 'line',
            name: 'Veneer, plywood and<br>engineered wood product<br>manufacturing',
            marker: {color: barColorInput},
            showlegend: true
        },
        {
            x: stateYOther,
            y: stateXOther,
            type: 'line',
            name: 'Other wood product<br>manufacturing',
            marker: {color: barColorInput},
            showlegend: true
        }
    ];




    return (


        <div className={"plotEIA"} >


            <Plot
                ref={dataChartNode}
                data={chartData}
                layout={{
                    height: heightP,
                    width: widthP,
                    title: 'Monthly Maine Exports by NACIS Code',
                    legend: {
                        orientation: "v"
                    },
                    yaxis: {
                        title: "Export Sum (USD)",
                        rangemode: 'tozero'},

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
            />
        </div>


    );
}