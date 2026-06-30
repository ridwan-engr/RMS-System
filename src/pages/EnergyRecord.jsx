import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayouts.jsx";
import api from "../api/axios.js";

export default function Energy() {

    const [records,setRecords]=useState([]);

    const [sites,setSites]=useState([]);

    const [selectedSite,setSelectedSite]=useState("");

    useEffect(()=>{

        loadEnergy();

        loadSites();

    },[]);

    async function loadEnergy(){

        const res=await api.get("/energy");

        setRecords(res.data.energy||[]);

    }

    async function loadSites(){

        const res=await api.get("/sites");

        setSites(res.data.sites||[]);

    }

    const filtered=selectedSite

    ?records.filter(r=>r.siteId?._id===selectedSite)

    :records;

    return(

    <DashboardLayout>

    <div className="container-fluid">

    <div className="d-flex justify-content-between mb-4">

    <h2>

    Hybrid Energy Dispatch Center

    </h2>

    <select

    className="form-select"

    style={{width:250}}

    value={selectedSite}

    onChange={(e)=>setSelectedSite(e.target.value)}

    >

    <option value="">All Sites</option>

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

    <div className="row g-3">

    {

    filtered.map(item=>(

    <div

    key={item._id}

    className="col-lg-6"

    >

    <div className="card shadow">

    <div className="card-header bg-success text-white">

    {item.siteId?.siteName}

    </div>

    <div className="card-body">

    <div className="row">

    <div className="col-6">

    <h6>Solar</h6>

    <h4>{item.solarPower} kW</h4>

    </div>

    <div className="col-6">

    <h6>Battery</h6>

    <h4>

    {item.batteryPower} kW

    </h4>

    <small>

    {item.batteryMode}

    </small>

    </div>

    <div className="col-6 mt-4">

    <h6>Generator</h6>

    <h4>

    {item.generatorPower} kW

    </h4>

    </div>

    <div className="col-6 mt-4">

    <h6>Grid</h6>

    <h4>

    {item.gridPower} kW

    </h4>

    </div>

    <div className="col-6 mt-4">

    <h6>Load</h6>

    <h4>

    {item.loadPower} kW

    </h4>

    </div>

    <div className="col-6 mt-4">

    <h6>Renewable</h6>

    <h4>

    {item.renewableContribution}%

    </h4>

    </div>

    <div className="col-6 mt-4">

    <h6>Efficiency</h6>

    <h4>

    {item.systemEfficiency}%

    </h4>

    </div>

    <div className="col-6 mt-4">

    <h6>Diesel Saved</h6>

    <h4>

    {item.dieselSaved} L

    </h4>

    </div>

    <div className="col-6 mt-4">

    <h6>CO₂ Reduction</h6>

    <h4>

    {item.co2Reduction} kg

    </h4>

    </div>

    <div className="col-6 mt-4">

    <h6>Total Generation</h6>

    <h4>

    {item.totalGeneration} kWh

    </h4>

    </div>

    <div className="col-6 mt-4">

    <h6>Total Consumption</h6>

    <h4>

    {item.totalConsumption} kWh

    </h4>

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