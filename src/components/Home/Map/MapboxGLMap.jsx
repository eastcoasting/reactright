import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Menu from 'react-burger-menu/lib/menus/slide'
import { FiLayers } from 'react-icons/fi';


import "../toggleStyles.css"
import "./sidebarStyles.css"
import "../accordionStyles.scss";
import "./legendStyle.css"
import Accordion from "../accordion";
import Layer from "./layer";
import Legend from "./Legend";



const styles = {
    width: "100vw",
    height: "93vh",
    top: "7.0vh",
    left: 0,
    bottom: "0vh",
    position: "absolute"
}



export const MapboxGLMap = ({
                                data,
                                getSelectedID,
                                colorBreaks,
                                highlightLineColor = { rgba: [255, 102, 0, 1] },
                            }) => {

    const mapContainer = useRef(null)
    const [statefulMap, setStatefulMap] = useState(null)

    const [ visibilityA, setVisibilityA]= useState('none')
    const [ sliderValueA, setSliderValueA ] = useState(100);

    const [ visibilityB, setVisibilityB]= useState('visible')
    const [ sliderValueB, setSliderValueB ] = useState(100);

    const [ visibilityC, setVisibilityC]= useState('none')
    const [ sliderValueC, setSliderValueC ] = useState(100);

    const [ visibilityD, setVisibilityD]= useState('none')
    const [ sliderValueD, setSliderValueD ] = useState(100);

    const [ visibilityE, setVisibilityE]= useState('none')
    const [ sliderValueE, setSliderValueE ] = useState(100);

    const [ visibilityF, setVisibilityF]= useState('visible')
    const [ sliderValueF, setSliderValueF ] = useState(100);

    const landClassStyles = ['native forest',
        '#668823',
        'scrub',
        '#640b2a',
        'grass',
        '#AADECC',
        'crop',
        '#FADD45',
        'water',
        '#5567AA',
        'planation',
        '#307633',
        'urban',
        '#BB0111',
        /* other */ '#cccccc']


    const landClassLegend = landClassStyles.reduce(function(result, value, index, array) {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);



    const ECLBreaks = [0,
        '#a1d99b',
        '1k',
        '#74C476',
        '100M',
        '#41AB5D',
        '150M',
        '#238B45',
        '500M',
        '#005A32'
    ];



    const ECLBreaksLegend = ECLBreaks.reduce(function(result, value, index, array) {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);








    const getFillColor = (colorBreaks) => {

        let fc = []
        fc.push('step')
        fc.push(['get', 'Shape_Area'])
        fc.push('rgba(0,0,0,0)')
        for (let colorBreak of colorBreaks) {
            fc.push(colorBreak.break)
            fc.push(`rgba(${colorBreak.rgba[0]}, ${colorBreak.rgba[1]}, ${colorBreak.rgba[2]},${colorBreak.rgba[3]})`)
        }

        return fc

    }


    const initMap = () => {

        mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbGNhcnRlciIsImEiOiJjamV4b2g3Z2ExOGF4MzFwN3R1dHJ3d2J4In0.Ti-hnuBH8W4bHn7k6GCpGw'

        const mapboxGlMap = new mapboxgl.Map({
            container: mapContainer.current,
            style: `mapbox://styles/mapbox/outdoors-v11`,
            center: [107, 13],
            zoom: 8
        })

        mapboxGlMap.addControl(new mapboxgl.NavigationControl())
        mapboxGlMap.addControl(new mapboxgl.FullscreenControl())

        mapboxGlMap.on("load", () => {

            mapboxGlMap.addSource("S2-source", {
                type: 'raster',
                tiles: [
                    'https://storage.googleapis.com/indufor-application-assets/Cambodia-ESG/True-Colour-S2/{z}/{x}/{y}'],
                tileSize: 256
            });
            // now add the layer, and reference the data source above by name
            mapboxGlMap.addLayer({
                id: "S2-layer",
                type: 'raster',
                source: "S2-source",
                paint: {},
            });

            mapboxGlMap.addSource('aoi', {
                type: 'geojson',
                data
            });

            if (colorBreaks) {
                mapboxGlMap.addLayer({
                    id: 'aoi-solid-fill',
                    source: 'aoi',
                    sourceLayer: 'aoi-source-layer',
                    type: 'fill',
                    paint: {'fill-color': getFillColor(colorBreaks)}
                })
            }

            mapboxGlMap.addSource('aughts05classes', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/eastcoasting/test/master/aughts05classes.json'
            });

            ///https://waterdata.usgs.gov/blog/tolcolors/
            mapboxGlMap.addLayer({
                id: 'aughts05classes',
                source: 'aughts05classes',
                type: 'fill',
                paint: {
                    'fill-opacity': 0.7,
                    'fill-color': [
                        'match',
                        ['get', 'F2005'],
                        ...landClassStyles
                    ]
                }

            });

            mapboxGlMap.addSource('aughts10classes', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/eastcoasting/test/master/aughts10classes.json'
            });

            ///https://waterdata.usgs.gov/blog/tolcolors/
            mapboxGlMap.addLayer({
                id: 'aughts10classes',
                source: 'aughts10classes',
                type: 'fill',
                paint: {
                    'fill-opacity': 0.7,
                    'fill-color': [
                        'match',
                        ['get', 'F2010'],
                        ...landClassStyles
                    ]
                }

            });

            mapboxGlMap.addSource('aughts15classes', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/eastcoasting/test/master/aughts15classes.json'
            });

            ///https://waterdata.usgs.gov/blog/tolcolors/
            mapboxGlMap.addLayer({
                id: 'aughts15classes',
                source: 'aughts15classes',
                type: 'fill',
                paint: {
                    'fill-opacity': 0.7,
                    'fill-color': [
                        'match',
                        ['get', 'F2015'],
                        ...landClassStyles
                    ]
                }

            });

            mapboxGlMap.addSource('aughts20classes', {
                type: 'geojson',
                data: 'https://raw.githubusercontent.com/eastcoasting/test/master/aughts20classes.json'
            });




            ///https://waterdata.usgs.gov/blog/tolcolors/
            mapboxGlMap.addLayer({
                id: 'aughts20classes',
                source: 'aughts20classes',
                type: 'fill',
                paint: {
                    'fill-opacity': 0.7,
                    'fill-color': [
                        'match',
                        ['get', 'F2020'],
                        ...landClassStyles
                    ]
                }

            });


            mapboxGlMap.addLayer({
                id: 'aoi-solid-line',
                source: 'aoi',
                type: 'line',
                paint: {
                    'line-color': 'white',
                    'line-width': 2
                }
            })

            //lay down a transparent highlight line layer, we'll use this layer later to highlight a feature based on selectedId
            mapboxGlMap.addLayer({
                id: 'aoi-highlight',
                source: 'aoi',
                type: 'line',
                paint: {
                    'line-color': `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]}, 0)`,
                    'line-width': 3,
                }
            })


            ///////////////////////////////////////////////////////////

            // Change the cursor to a pointer when the mouse is over the layer.
            mapboxGlMap.on('mouseenter', 'aoi-solid-fill', function () {
                mapboxGlMap.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            mapboxGlMap.on('mouseleave', 'aoi-solid-fill', function () {
                mapboxGlMap.getCanvas().style.cursor = '';
            });

            // When AOI is clicked
            mapboxGlMap.on('click', 'aoi-solid-fill', function (e) {
                //Popup
                new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML('<h3> ELC ID: ' + e.features[0].properties.id + '</h3>'
                        + '<hr>' +
                        '<h4> Shape Area: ' + Math.round(e.features[0].properties.Shape_Area) + '</h4>')
                    .addTo(mapboxGlMap);

                //Zoom in
                const coordinates = e.features[0].geometry.coordinates[0];
                const bounds = coordinates.reduce(function (bounds, coord) {
                    return bounds.extend(coord);
                }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));


                mapboxGlMap.fitBounds(bounds, {
                    padding: 100
                });

                //color bounds
                mapboxGlMap.setPaintProperty('aoi-highlight', 'line-color', [
                    'case',
                    ['==', ['get', 'id'], e.features[0].properties.id],
                    `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]},${highlightLineColor.rgba[3]})`,
                    'rgba(0,0,0,0)'
                ]);

            });

            const layerStyles = mapboxGlMap.getStyle().layers

            console.log(layerStyles)


            setStatefulMap(mapboxGlMap)
            console.log('mapStateful set in state')
        })
    }


    useEffect(() => {


        if (!statefulMap) {
            initMap()
        } else {


            if (getSelectedID()) {
                console.log(`selectedId is not null, highlight selectedId: ${getSelectedID()}`)
                statefulMap.setPaintProperty('aoi-highlight', 'line-color', [
                    'case',
                    ['==', ['get', 'id'], parseInt(getSelectedID())],
                    `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]},${highlightLineColor.rgba[3]})`,
                    'rgba(0,0,0,0)'
                ]);

                const aoiFeatures = data.features.filter(feature => feature.properties.id === parseInt(getSelectedID()));
                const coordinates = (aoiFeatures[0].geometry.coordinates[0][0]);
                const bounds = coordinates.reduce(function (bounds, coord) {
                    return bounds.extend(coord);
                }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
                statefulMap.fitBounds(bounds, {
                    padding: 100
                });

            } else {
                statefulMap.setPaintProperty('aoi-highlight', 'line-color', 'rgba(0,0,0,0)')
                statefulMap.flyTo({center: [107, 13], zoom: 8});
            }

        }

    }, [statefulMap,
        getSelectedID()
    ])




    useEffect(() => {

        if (!statefulMap) {
        } else {

            statefulMap.setLayoutProperty('aoi-solid-fill', 'visibility', `${visibilityA}`)
            statefulMap.setPaintProperty(
                'aoi-solid-fill',
                'fill-opacity',
                parseInt(`${sliderValueA}`, 10) / 100
            );

            statefulMap.setLayoutProperty('S2-layer', 'visibility', `${visibilityB}`)
            statefulMap.setPaintProperty(
                'S2-layer',
                'raster-opacity',
                parseInt(`${sliderValueB}`, 10) / 100
            );

            statefulMap.setLayoutProperty('aughts05classes', 'visibility', `${visibilityC}`)
            statefulMap.setPaintProperty(
                'aughts05classes',
                'fill-opacity',
                parseInt(`${sliderValueC}`, 10) / 100
            );

            statefulMap.setLayoutProperty('aughts10classes', 'visibility', `${visibilityD}`)
            statefulMap.setPaintProperty(
                'aughts10classes',
                'fill-opacity',
                parseInt(`${sliderValueD}`, 10) / 100
            );

            statefulMap.setLayoutProperty('aughts15classes', 'visibility', `${visibilityE}`)
            statefulMap.setPaintProperty(
                'aughts15classes',
                'fill-opacity',
                parseInt(`${sliderValueE}`, 10) / 100
            );

            statefulMap.setLayoutProperty('aughts20classes', 'visibility', `${visibilityF}`)
            statefulMap.setPaintProperty(
                'aughts20classes',
                'fill-opacity',
                parseInt(`${sliderValueF}`, 10) / 100
            );


        }

    }, [statefulMap,
        visibilityA,
        visibilityB,
        visibilityC,
        visibilityD,
        visibilityE,
        visibilityF,
        sliderValueA,
        sliderValueB,
        sliderValueC,
        sliderValueD,
        sliderValueE,
        sliderValueF,

    ])




    return (
      <div>
          <div style={styles}
               ref={mapContainer}/>

          <div className={'legendBox'} >


              {(visibilityA === 'visible') ?

                  <Legend
                      legendLayerTitle={'ECL Tracts'}
                      itemArray={ECLBreaksLegend}
                      legendLayerFormat={'Area in m2'}/>
                  :
                  null
              }


              {(
                  visibilityD === 'visible' ||
                  visibilityE === 'visible') ?

                  <Legend
                      legendLayerTitle={'Land Cover Type'}
                      itemArray={landClassLegend}/>
                  :
                  null
              }


              {(visibilityC === 'visible' ||
                  visibilityF === 'visible') ?

                  <Legend
                      legendLayerTitle={'Land Cover Type'}
                      itemArray={landClassLegend}/>
                  :
                  null
              }

          </div>

          <Menu customBurgerIcon={ <FiLayers /> } isOpen={ true } noOverlay={true}>
                  <Accordion title="Primary Layers" >

                          <Layer
                              layerTitle={'ECL Tracts'}
                              sourceDetails={'Indufor 2020'}
                              layerDescription={'ECL Tracts'}
                              defaultChecked={false}
                              onToggleChange={ (e) => {
                                  if(e.target.checked === false) {
                                      setVisibilityA('none')
                                  }
                                  else {
                                      setVisibilityA('visible')
                                  }
                              }}
                              onSliderChange={(e) => setSliderValueA(e.target.value)}
                              sliderChangeValue={sliderValueA}
                          />

                      <Layer
                          layerTitle={'S2 Layer'}
                          sourceDetails={'Indufor 2020'}
                          layerDescription={'S2 Layer'}
                          defaultChecked={true}
                          onToggleChange={ (e) => {
                              if(e.target.checked === false) {
                                  setVisibilityB('none')
                              }
                              else {
                                  setVisibilityB('visible')
                              }
                          }}
                          onSliderChange={(e) => setSliderValueB(e.target.value)}
                          sliderChangeValue={sliderValueB}
                      />
                  </Accordion>

              <Accordion title="Land Classification">
                  <Layer
                      layerTitle={'2005 Classes'}
                      sourceDetails={'Indufor 2020'}
                      layerDescription={'2005 Classes'}
                      defaultChecked={false}
                      onToggleChange={ (e) => {
                          if(e.target.checked === false) {
                              setVisibilityC('none')
                          }
                          else {
                              setVisibilityC('visible')
                          }
                      }}
                      onSliderChange={(e) => setSliderValueC(e.target.value)}
                      sliderChangeValue={sliderValueC}
                  />

                  <Layer
                      layerTitle={'2010 Classes'}
                      sourceDetails={'Indufor 2020'}
                      layerDescription={'2010 Classes'}
                      defaultChecked={false}
                      onToggleChange={ (e) => {
                          if(e.target.checked === false) {
                              setVisibilityD('none')
                          }
                          else {
                              setVisibilityD('visible')
                          }
                      }}
                      onSliderChange={(e) => setSliderValueD(e.target.value)}
                      sliderChangeValue={sliderValueD}
                  />

                  <Layer
                      layerTitle={'2015 Classes'}
                      sourceDetails={'Indufor 2020'}
                      layerDescription={'2015 Classes'}
                      defaultChecked={false}
                      onToggleChange={ (e) => {
                          if(e.target.checked === false) {
                              setVisibilityE('none')
                          }
                          else {
                              setVisibilityE('visible')
                          }
                      }}
                      onSliderChange={(e) => setSliderValueE(e.target.value)}
                      sliderChangeValue={sliderValueE}
                  />

                  <Layer
                      layerTitle={'2020 Classes'}
                      sourceDetails={'Indufor 2020'}
                      layerDescription={'2020 Classes'}
                      defaultChecked={true}
                      onToggleChange={ (e) => {
                          if(e.target.checked === false) {
                              setVisibilityF('none')
                          }
                          else {
                              setVisibilityF('visible')
                          }
                      }}
                      onSliderChange={(e) => setSliderValueF(e.target.value)}
                      sliderChangeValue={sliderValueF}
                  />

              </Accordion>

          </Menu>


      </div>


    )
}

