import React from "react";
import { Link, withRouter } from "react-router-dom";

import './navbar.css'

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className={"navbar navbar-expand-lg"} style={{backgroundColor: "#FAFAFA", right: 0, height: '7vh'}} >
        <div className={"container"}>
          <Link className={"navbar-brand-logo"} to="/">

            <svg className={'logo'}
                 style={{width: "407.49px", height: "145.333px", transform: "scale(0.4)", left: '0vw !important'}} >
					<g id="Layer_1">
						<g>
							<polygon fill="#009444" points="234.924,77.189 225.48,80.257 239.552,57.771 235.145,26.236 211.495,4.912 179.673,3.781
								154.569,23.367 148.204,53.207 162.846,82.612 162.73,95.163 154.708,100.99 167.226,139.512 240.148,139.442 258.725,100.733
								"></polygon>
                          <polygon fill="#009444" points="83.865,34.952 59.646,47.899 46.661,72.595 50.952,88.244 31.656,95.929 20.855,117.562
								31.035,139.49 110.634,139.512 123.042,124.713 123.201,113.451 129.117,113.152 148.915,93.124 151.203,65.057 134.918,42.083
								"></polygon>
                          <polygon fill="#00483C"
                                   points="177.189,47.899 125.402,71.647 133.609,139.41 179.372,139.512 204.565,89.397 		"></polygon>
                          <polygon fill="#00483C"
                                   points="3.139,100.99 15.656,139.512 56.157,139.512 68.673,100.99 35.906,26.562 		"></polygon>
                          <polygon fill="#FFFFFF" points="135.112,119.814 135.112,104.903 74.414,104.903 74.414,62.378 65.561,62.378 65.561,104.903
								48.257,104.866 48.257,140.626 59.646,140.626 135.112,140.626 135.112,125.821 		"></polygon>
                          <polygon fill="#FFFFFF" points="194.772,100.733 177.536,115.421 177.536,119.814 177.542,119.814 177.542,140.626
								212.007,140.626 212.007,125.821 212.007,115.421 		"></polygon>
                          <polygon fill="#FFFFFF" points="173.556,125.821 173.556,104.903 156.321,90.215 139.086,104.903 139.086,125.821
								139.086,125.821 139.086,140.626 139.086,140.626 173.556,140.626 173.563,140.626 173.563,125.821 		"></polygon>
                          <g>
								<path fill="#00483C" stroke="#00483C" strokeWidth="2" strokeLinejoin="bevel"
                                      strokeMiterlimit="10" d="M264.261,93.286
									V53.207h19.983v6.772h-12.322v9.214h9.656v6.774h-9.656v17.318H264.261z"></path>
                            <path fill="#00483C" stroke="#00483C" strokeWidth="2" strokeLinejoin="bevel"
                                  strokeMiterlimit="10" d="M287.464,66.085
									c0-9.88,5.22-13.434,12.657-13.434s12.655,3.554,12.655,13.434v14.322c0,9.881-5.218,13.435-12.655,13.435
									s-12.657-3.554-12.657-13.435V66.085z M295.125,81.407c0,4.439,1.942,5.661,4.996,5.661c3.053,0,4.995-1.222,4.995-5.661v-16.32
									c0-4.441-1.942-5.663-4.995-5.663c-3.054,0-4.996,1.222-4.996,5.663V81.407z"></path>
                            <path fill="#00483C" stroke="#00483C" strokeWidth="2" strokeLinejoin="bevel"
                                  strokeMiterlimit="10" d="M335.843,93.286
									l-6.661-16.321h-3.664v16.321h-7.66V53.207h11.102c9.215,0,13.602,4.44,13.602,11.99c0,4.997-1.775,8.604-6.05,10.212
									l7.547,17.877H335.843z M325.518,70.637h3.942c3.385,0,5.44-1.665,5.44-5.55c0-3.887-2.056-5.551-5.44-5.551h-3.942V70.637z"></path>
                            <path fill="#00483C" stroke="#00483C" strokeWidth="2" strokeLinejoin="bevel"
                                  strokeMiterlimit="10" d="M264.705,140.471
									V100.39h10.712l6.94,26.315h0.111l6.938-26.315h10.715v40.081h-6.551v-31.53h-0.111l-8.159,31.53h-5.774l-8.159-31.53h-0.112
									v31.53H264.705z"></path>
                            <path fill="#00483C" stroke="#00483C" strokeWidth="2" strokeLinejoin="bevel"
                                  strokeMiterlimit="10" d="M303.59,140.471
									l9.936-40.081h9.826l9.658,40.081h-7.326l-1.944-8.438h-10.603l-2.164,8.438H303.59z M314.525,125.261h7.604l-3.72-16.211h-0.109
									L314.525,125.261z"></path>
                            <path fill="#00483C" stroke="#00483C" strokeWidth="2" strokeLinejoin="bevel"
                                  strokeMiterlimit="10" d="M336.077,140.471
									V100.39h7.66v40.081H336.077z"></path>
                            <path fill="#00483C" stroke="#00483C" strokeWidth="2" strokeLinejoin="bevel"
                                  strokeMiterlimit="10" d="M349.564,140.471
									V100.39h8.381l10.66,23.761h0.11V100.39h6.994v40.081h-7.326l-11.713-25.867h-0.111v25.867H349.564z"></path>
                            <path fill="#00483C" stroke="#00483C" strokeWidth="2" strokeLinejoin="bevel"
                                  strokeMiterlimit="10" d="M381.599,140.471
									V100.39h20.983v6.773H389.26v9.215h10.16v6.773h-10.16v10.547h13.878v6.772H381.599z"></path>
                            <polygon fill="#00483C" stroke="#00483C" strokeWidth="2" strokeLinejoin="bevel"
                                     strokeMiterlimit="10" points="
									354.667,93.755 349.564,93.755 359.782,53.207 364.884,53.207"></polygon>
							</g>
						</g>
					</g>
				</svg>
          </Link>
          <button
            className={"navbar-toggler"}
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className={"navbar-toggler-icon"}></span>
          </button>
          <div className={"collapse navbar-collapse"} id="navbarResponsive">
            <ul className={"navbar-nav ml-auto"}>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className={"nav-link"} style={{color: '#074E3D', fontWeight: 'bold'}}   to="/">
                  Home
                  <span className={"sr-only"}>(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className={"nav-link"} style={{color: '#074E3D', fontWeight: 'bold'}} to="/about">
                  Scrollytelling
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link className={"nav-link"} style={{color: '#074E3D', fontWeight: 'bold'}} to="/contact">
                  Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
