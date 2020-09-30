import React from "react";
import FullTable from "./Table/WagesTable";
import PopTable from "./Table/PopTable";


import {PlotEIA} from './plotEIA'
import {PlotExportsWood} from './plotExportsWood'
import {PlotExportsPaper} from './plotExportsPaper'
import {PlotHSExports} from './hsExports'

export const Contact = () => {



  return (
    <div className="contact">

        <PlotHSExports
            heightP={'50vh'}
            widthP={'50%'}
        />

        <h1 style={{display: 'block'}} >International Exports from Maine by Product</h1>
        <div className={"exportPlots"} style={{ display: 'flex'}}>
            <PlotExportsWood
                heightP={'50vh'}
                widthP={'50%'}
            />

            <PlotExportsPaper
                heightP={'50vh'}
                widthP={'50%'}
            />
        </div>


        <div className="container">
            <h1>Energy Costs</h1>
            <PlotEIA
                heightP={600}
                widthP={900}
            />
        </div>

        <div>
            <h1>Employment and Earnings</h1>
            <FullTable />
        </div>

        <div>
            <h1>Population</h1>
            <PopTable />
        </div>


    </div>
  );
}