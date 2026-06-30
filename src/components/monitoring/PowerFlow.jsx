import { useEffect, useState } from "react";

import ReactFlow, {

Background,

Controls,

MiniMap,

MarkerType

} from "reactflow";

import "reactflow/dist/style.css";

import api from "../../api/axios.js";

import socket from "../../api/socket.js";

export default function PowerFlow(){

const [flow,setFlow]=useState({

solar:0,

battery:0,

generator:0,

grid:0,

load:0,

batteryMode:"Idle"

});

useEffect(()=>{

loadFlow();

socket.connect();

socket.on(

"power:update",

updateFlow

);

return ()=>{

socket.off(

"power:update",

updateFlow

);

socket.disconnect();

};

},[]);

async function loadFlow(){

try{

const response=

await api.get(

"/energy"

);

setFlow(

response.data

);

}

catch(error){

console.error(error);

}

}

function updateFlow(data){

setFlow(data);

}

const nodes=[

{

id:"solar",

position:{x:50,y:40},

data:{

label:

`☀ Solar

${flow.solar} kW`

}

},

{

id:"battery",

position:{x:50,y:250},

data:{

label:

`🔋 Battery

${flow.battery}%

${flow.batteryMode}`

}

},

{

id:"generator",

position:{x:50,y:470},

data:{

label:

`⛽ Generator

${flow.generator} kW`

}

},

{

id:"grid",

position:{x:500,y:40},

data:{

label:

`⚡ Grid

${flow.grid} kW`

}

},

{

id:"load",

position:{x:500,y:250},

data:{

label:

`🏢 Load

${flow.load} kW`

}

}

];

const edges=[

{

id:"solar-load",

source:"solar",

target:"load",

animated:flow.solar>0,

markerEnd:{

type:MarkerType.ArrowClosed

}

},

{

id:"solar-battery",

source:"solar",

target:"battery",

animated:

flow.batteryMode==="Charging",

markerEnd:{

type:MarkerType.ArrowClosed

}

},

{

id:"battery-load",

source:"battery",

target:"load",

animated:

flow.batteryMode==="Discharging",

markerEnd:{

type:MarkerType.ArrowClosed

}

},

{

id:"generator-load",

source:"generator",

target:"load",

animated:flow.generator>0,

markerEnd:{

type:MarkerType.ArrowClosed

}

},

{

id:"grid-load",

source:"grid",

target:"load",

animated:flow.grid>0,

markerEnd:{

type:MarkerType.ArrowClosed

}

}

];

return(

<div className="card shadow">

<div className="card-header bg-primary text-white">

<strong>

Real-Time Power Flow

</strong>

</div>

<div style={{

height:650

}}>

<ReactFlow

nodes={nodes}

edges={edges}

fitView

>

<MiniMap/>

<Controls/>

<Background/>

</ReactFlow>

</div>

</div>

);

}