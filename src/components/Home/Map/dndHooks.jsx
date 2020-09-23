import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import Task from './Task'


function Column(props){
    const { classes, id, list } = props;

    let style = {
        backgroundColor:"orange",
        height:"300px",
        width:"400px",
        margin:"100px"

    }

    console.log(list)

    return (

        <Droppable droppableId = {id}>
            {provided => (

                <div {...provided.droppableProps} ref={provided.innerRef} style={style}>

                    {list.map((val,index)=>{
                        return <Task id={val.id} key={index} index={index} title={val.title}/>
                    })}

                    {provided.placeholder}
                </div>
            )
            }
        </Droppable>
    )
}

export default Column