import React from "react";
import { slide as Menu } from "react-burger-menu";
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import "./sidebarStyles.css"



export default props => {
    console.log(props)

    return (
        // Pass on our props
        <Menu {...props} className={"sidebar"}>

            <label>
                <Toggle
                    icons={false}
                <span>No icons</span>
            </label>
        </Menu>
    );
};
