import React, { useState } from "react";
import {PlotlyBarComponent} from "./Plot/plot";
import {MapboxGLMap} from "./Map/MapboxGLMap"
import {  ECL_geo_data, color_breaks } from "./Plot/Data/data";


export const Home = () => {
    const [selectedId, setSelectedId] = useState(0);


  return (
    <div className="home">
      <div className="row">
          <MapboxGLMap
          data={ECL_geo_data()}
          colorBreaks={color_breaks()}
          highlightLineColor={{ rgba: [255, 102, 0, 1] }}
          coordinates={[-119.846, 43.862]}
          zoom={6}
          getSelectedID={() => selectedId}
          />
          <div className="plotly">
              <PlotlyBarComponent
                  heightP={450}
                  widthP={550}
                  onClick={(e) => {
                      if(e.points[0].x == selectedId) {
                          setSelectedId(0);
                      }
                      else{
                          setSelectedId(e.points[0].x);
                      }

                  }}
              />
        </div>
      </div>
    </div>
  );
};
