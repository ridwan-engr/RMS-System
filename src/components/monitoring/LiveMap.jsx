import { useEffect, useState } from "react";

import {

    MapContainer,

    TileLayer,

    Marker,

    Popup,

    Circle,

    Tooltip

} from "react-leaflet";

import L from "leaflet";

import

"leaflet/dist/leaflet.css";

import

"leaflet-defaulticon-compatibility";

import

"leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import api from "../../api/axios.jsx";

export default function LiveMap(){

    const [sites,setSites]=

    useState([]);

    useEffect(()=>{

        loadSites();

    },[]);

    async function loadSites(){

        try{

            const res=

            await api.get("/sites");

            setSites(

                res.data.sites ||

                res.data ||

                []

            );

        }

        catch(error){

            console.error(error);

        }

    }

    return(

    <div className="card shadow">

    <div className="card-header bg-primary text-white">

    <strong>

    Live Site Monitoring

    </strong>

    </div>

    <div className="card-body">

    <MapContainer

    center={[9.0820,8.6753]}

    zoom={6}

    style={{

        height:"600px",

        width:"100%"

    }}

    >

    <TileLayer

    attribution='© OpenStreetMap'

    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

    />

    {

    sites.map(site=>(

    <>

    <Marker

    key={site._id}

    position={[

    site.latitude,

    site.longitude

    ]}

    >

    <Popup>

    <h5>

    {site.siteName}

    </h5>

    <hr/>

    <strong>

    Status:

    </strong>

    {

    site.status ||

    "Online"

    }

    <br/>

    <strong>

    Solar:

    </strong>

    {

    site.solarPower

    } kW

    <br/>

    <strong>

    Battery:

    </strong>

    {

    site.batterySOC

    } %

    <br/>

    <strong>

    Generator:

    </strong>

    {

    site.generatorStatus

    }

    <br/>

    <strong>

    Grid:

    </strong>

    {

    site.gridStatus

    }

    </Popup>

    <Tooltip>

    {site.siteName}

    </Tooltip>

    </Marker>

    <Circle

    center={[

    site.latitude,

    site.longitude

    ]}

    radius={300}

    pathOptions={{

        color:

        site.status==="Offline"

        ?"red"

        :"green"

    }}

    />

    </>

    ))

    }

    </MapContainer>

    </div>

    </div>

    );

}