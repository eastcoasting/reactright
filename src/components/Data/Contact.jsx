import React from "react";
import {PlotEIA} from './plotEIA'
import App2 from './tablePop'
import {PlotExports} from './plotExports'

export const Contact = () => {



  return (
    <div className="contact">

        <PlotExports
            heightP={600}
            widthP={900}
        />

        <div className="container">
            <PlotEIA
                heightP={600}
                widthP={900}
            />
        </div>

        <App2 />

    </div>
  );
}