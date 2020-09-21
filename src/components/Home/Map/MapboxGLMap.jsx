import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Menu from 'react-burger-menu/lib/menus/slide'
import Toggle from 'react-toggle'
import { FiLayers } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdOpacity } from 'react-icons/md';

import "../toggleStyles.css"
import "./sidebarStyles.css"
import "../accordionStyles.scss";
import Accordion from "../accordion";
import Modal from 'react-modal';
import Layer from "./slider";



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
    const [ visibilityB, setVisibilityB]= useState('visible')
    const [ visibilityC, setVisibilityC]= useState('none')
    const [ visibilityD, setVisibilityD]= useState('none')
    const [ visibilityE, setVisibilityE]= useState('none')
    const [ visibilityF, setVisibilityF]= useState('visible')





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

    //
    // var slider = document.getElementById('slider');
    // var sliderValue = document.getElementById('slider-value');

    const [ sliderValue, setSliderValue ] = useState(100);


    function handleChange(e) {
        console.log(e.target.value);
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
            };

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
                        'native forest',
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
                        /* other */ '#ccc'
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
                        'native forest',
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
                        /* other */ '#ccc'
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
                        'native forest',
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
                        /* other */ '#ccc'
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
                        'native forest',
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
                        /* other */ '#ccc'
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
                var coordinates = e.features[0].geometry.coordinates[0];
                var bounds = coordinates.reduce(function (bounds, coord) {
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

            setStatefulMap(mapboxGlMap)
            console.log('mapStateful set in state')
        })
    }


    useEffect(() => {


        if (!statefulMap) {
            initMap()
        } else {
            console.log('useEffect running! statefulMap or selectedId must have changed.')

            statefulMap.setLayoutProperty('aoi-solid-fill', 'visibility', `${visibilityA}`)
            statefulMap.setLayoutProperty('S2-layer', 'visibility', `${visibilityB}`)
            statefulMap.setLayoutProperty('aughts05classes', 'visibility', `${visibilityC}`)
            statefulMap.setLayoutProperty('aughts10classes', 'visibility', `${visibilityD}`)
            statefulMap.setLayoutProperty('aughts15classes', 'visibility', `${visibilityE}`)
            statefulMap.setLayoutProperty('aughts20classes', 'visibility', `${visibilityF}`)


            statefulMap.setPaintProperty(
                'aoi-solid-fill',
                'fill-opacity',
                parseInt(`${sliderValue}`, 10) / 100
            );





            if (getSelectedID()) {
                console.log(`selectedId is not null, highlight selectedId: ${getSelectedID()}`)
                statefulMap.setPaintProperty('aoi-highlight', 'line-color', [
                    'case',
                    ['==', ['get', 'id'], parseInt(getSelectedID())],
                    `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]},${highlightLineColor.rgba[3]})`,
                    'rgba(0,0,0,0)'
                ]);

                var aoiFeatures = data.features.filter(feature => feature.properties.id === parseInt(getSelectedID()));
                var coordinates = (aoiFeatures[0].geometry.coordinates[0][0]);
                var bounds = coordinates.reduce(function (bounds, coord) {
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

    }, [statefulMap, getSelectedID(), visibilityA, visibilityB, visibilityC, visibilityD, visibilityE, visibilityF, sliderValue ])




    return (
      <div>
          <div style={styles}
               ref={mapContainer}/>
          <Menu customBurgerIcon={ <FiLayers /> } isOpen={ true } noOverlay={true}>
                  <Accordion title="Primary Layers" >

                          <Layer
                              layerTitle={'ECL Tracts'}
                              onToggleChange={ (e) => {
                                  if(e.target.checked == false) {
                                      setVisibilityA('none')
                                  }
                                  else {
                                      setVisibilityA('visible')
                                  }
                              }}
                              onSliderChange={(e) => setSliderValue(e.target.value)}
                              sliderChangeValue={sliderValue}
                          />

                      <label>
                          <Toggle
                              icons={false}
                              defaultChecked={true}
                              onChange={ (e) => {
                                  if(e.target.checked == false) {
                                      setVisibilityB('none')
                                  }
                                  else {
                                      setVisibilityB('visible')
                                  }
                              }
                              }/>
                          <span style={{padding: '0.5em'}}>{'S2 Layer'}</span>
                      </label>
                  </Accordion>

              <Accordion title="Land Classification">
                  <label>
                      <Toggle
                          icons={false}
                          defaultChecked={false}
                          onChange={ (e) => {
                              if(e.target.checked == false) {
                                  setVisibilityC('none')
                              }
                              else {
                                  setVisibilityC('visible')
                              }
                          }
                          }/>
                      <span style={{padding: '0.5em'}}>{'2005 Classes'}</span>
                  </label>
                  <label>
                      <Toggle
                          icons={false}
                          defaultChecked={false}
                          onChange={ (e) => {
                              if(e.target.checked == false) {
                                  setVisibilityD('none')
                              }
                              else {
                                  setVisibilityD('visible')
                              }
                          }
                          }/>
                      <span style={{padding: '0.5em'}}>{'2010 Classes'}</span>
                  </label>
                  <label>
                      <Toggle
                          icons={false}
                          defaultChecked={false}
                          onChange={ (e) => {
                              if(e.target.checked == false) {
                                  setVisibilityE('none')
                              }
                              else {
                                  setVisibilityE('visible')
                              }
                          }
                          }/>
                      <span style={{padding: '0.5em'}}>{'2015 Classes'}</span>
                  </label>
                  <label>
                      <Toggle
                          icons={false}
                          defaultChecked={true}
                          onChange={ (e) => {
                              if(e.target.checked == false) {
                                  setVisibilityF('none')
                              }
                              else {
                                  setVisibilityF('visible')
                              }
                          }
                          }/>
                      <span style={{padding: '0.5em'}}>{'2020 Classes'}</span>
                  </label>
              </Accordion>

          </Menu>


      </div>


    )
}