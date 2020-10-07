import React from "react";

import FullTable from "./Table/WagesTable";
import PopTable from "./Table/PopTable";
import Scrollspy from 'react-scrollspy'

import "./scrollStyles.css";

import {PlotEIA} from './plotEIA'
import {PlotExportsWood} from './plotExportsWood'
import {PlotExportsPaper} from './plotExportsPaper'
import {PlotHSExports} from './hsExports'

export const Contact = () => {



  return (
    <div className="contact">
        <div className="primary-page">
            <section id="section-1" style={{ paddingTop: '60px',
                marginTop: '-40px'}}>
                <div className={"exportPlots"}>
                    <PlotHSExports
                    />
                </div>
            </section>

            <section id="section-2" style={{ paddingTop: '60px',
                marginTop: '-40px'}}>
                <h1 style={{display: 'block'}} >International Exports from Maine by NACIS Code</h1>
                <div className={"exportPlots"} style={{ display: 'flex'}}>
                    <PlotExportsWood
                    />
                    <PlotExportsPaper
                    />
                </div>
            </section>

            <section id="section-3" style={{ paddingTop: '60px',
                marginTop: '-40px'}}>
                <div className="plotEIAContainer">
                    <h1>Energy Costs</h1>
                    <PlotEIA
                    />
                </div>
            </section>

            <section id="section-4" style={{ paddingTop: '60px',
                marginTop: '-40px'}}>
                <div>
                    <h1>Employment and Earnings</h1>
                    <FullTable />
                </div>
            </section>

            <section id="section-5"  style={{ paddingTop: '60px', paddingBottom: '10rem',
                marginTop: '-40px'}}>
                <div>
                    <h1>Population</h1>
                    <PopTable />
                </div>
            </section>
        </div>

        <Scrollspy
            className="scrollspy"
            items={ ['section-1', 'section-2', 'section-3', 'section-4', 'section-5'] }
            offset={-100}
            currentClassName="isCurrent">
            <li><a href="#section-1">Monthly Maine Manufacturing<br />Exports by HS Code</a></li>
            <li><a href="#section-2">Monthly Maine International<br />Exports by NACIS Code</a></li>
            <li><a href="#section-3">Energy Costs</a></li>
            <li><a href="#section-4">Employment and Earnings<br />by MSA and Title</a></li>
            <li><a href="#section-5">Population by County</a></li>
        </Scrollspy>


    </div>
  );
}