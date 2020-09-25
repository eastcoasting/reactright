import React from "react";
import {PlotEIA} from './plotEIA'
import {PlotlyBarComponent} from "../Home/Plot/plot";
export const Contact = () => {



  return (
    <div className="contact">
      <div class="container">
          <PlotEIA
              heightP={450}
              widthP={550}
          />

      </div>
    </div>
  );
}