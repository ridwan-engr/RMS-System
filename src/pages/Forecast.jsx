import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";

export default function Forecast() {

    const [forecast,setForecast]=useState([]);

    const [sites,setSites]=useState([]);

    const [selectedSite,setSelectedSite]=useState("");

    useEffect(()=>{

        loadForecast();

        loadSites();

    },[]);

    async function loadForecast(){

        const res=await api.get("/forecasts");

        setForecast(res.data.forecasts||[]);

    }

    async function loadSites(){

        const res=await api.get("/sites");

        setSites(res.data.sites||[]);

    }

    const filtered=

    selectedSite

    ?forecast.filter(

    f=>f.siteId?._id===selectedSite

    )

    :forecast;

    return(

    <DashboardLayout>

    <div className="container-fluid">

    <div className="d-flex justify-content-between mb-4">

    <h2>

    Renewable Energy Forecast Center

    </h2>

    <select

    className="form-select"

    style={{width:250}}

    value={selectedSite}

    onChange={(e)=>setSelectedSite(e.target.value)}

    >

    <option value="">

    All Sites

    </option>

    {

    sites.map(site=>(

    <option

    key={site._id}

    value={site._id}

    >

    {site.siteName}

    </option>

    ))

    }

    </select>

    </div>

    <div className="row">

    {

    filtered.map(item=>(

    <div

    key={item._id}

    className="col-lg-6"

    >

    <div className="card shadow mb-4">

    <div className="card-header bg-primary text-white">

    {item.siteId?.siteName}

    </div>

    <div className="card-body">

    <div className="row">

    <div className="col-6">

    <strong>Date</strong>

    <p>

    {new Date(item.forecastDate).toLocaleDateString()}

    </p>

    </div>

    <div className="col-6">

    <strong>Weather</strong>

    <p>

    {item.weather}

    </p>

    </div>

    <div className="col-6">

    <strong>Irradiance</strong>

    <p>

    {item.irradiance} W/m²

    </p>

    </div>

    <div className="col-6">

    <strong>Temperature</strong>

    <p>

    {item.ambientTemperature} °C

    </p>

    </div>

    <div className="col-6">

    <strong>PV Forecast</strong>

    <p>

    {item.pvForecast} kWh

    </p>

    </div>

    <div className="col-6">

    <strong>Load Forecast</strong>

    <p>

    {item.loadForecast} kWh

    </p>

    </div>

    <div className="col-6">

    <strong>Battery SOC</strong>

    <p>

    {item.batterySOCForecast} %

    </p>

    </div>

    <div className="col-6">

    <strong>Battery Autonomy</strong>

    <p>

    {item.batteryAutonomy} hrs

    </p>

    </div>

    <div className="col-6">

    <strong>Generator Runtime</strong>

    <p>

    {item.generatorRuntimeForecast} hrs

    </p>

    </div>

    <div className="col-6">

    <strong>Grid Availability</strong>

    <p>

    {item.gridAvailabilityForecast} %

    </p>

    </div>

    <div className="col-6">

    <strong>Renewable Share</strong>

    <p>

    {item.renewableContributionForecast} %

    </p>

    </div>

    <div className="col-6">

    <strong>Diesel Forecast</strong>

    <p>

    {item.dieselForecast} L

    </p>

    </div>

    <div className="col-6">

    <strong>CO₂ Reduction</strong>

    <p>

    {item.co2Forecast} kg

    </p>

    </div>

    <div className="col-6">

    <strong>Confidence</strong>

    <p>

    {item.confidenceLevel} %

    </p>

    </div>

    </div>

    </div>

    </div>

    </div>

    ))

    }

    </div>

    </div>

    </DashboardLayout>

    );

}