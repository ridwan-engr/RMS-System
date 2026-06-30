import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayouts.jsx";
import api from "../api/axios.js";

export default function Generator() {

    const [generators, setGenerators] = useState([]);
    const [sites, setSites] = useState([]);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null);

    const [form, setForm] = useState({
        siteId: "",
        generatorName: "",
        capacityKVA: "",
        fuelType: "Diesel",
        fuelLevel: "",
        fuelConsumption: "",
        runningHours: "",
        outputPower: "",
        engineTemperature: "",
        oilPressure: "",
        maintenanceDueHours: "",
        status: "Stopped"
    });

    useEffect(() => {

        loadGenerators();
        loadSites();

    }, []);

    async function loadGenerators() {

        const res = await api.get("/generator");

        setGenerators(res.data.generators || []);

    }

    async function loadSites() {

        const res = await api.get("/sites");

        setSites(res.data.sites || []);

    }

    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function submit(e){

        e.preventDefault();

        if(editing){

            await api.put(`/generator/${editing}`,form);

        }

        else{

            await api.post("/generator",form);

        }

        reset();

        loadGenerators();

    }

    function edit(item){

        setEditing(item._id);

        setForm(item);

    }

    async function remove(id){

        if(!window.confirm("Delete Generator?")) return;

        await api.delete(`/generator/${id}`);

        loadGenerators();

    }

    function reset(){

        setEditing(null);

        setForm({

            siteId:"",
            generatorName:"",
            capacityKVA:"",
            fuelType:"Diesel",
            fuelLevel:"",
            fuelConsumption:"",
            runningHours:"",
            outputPower:"",
            engineTemperature:"",
            oilPressure:"",
            maintenanceDueHours:"",
            status:"Stopped"

        });

    }

    const filtered=generators.filter(

        g=>g.generatorName
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

    return(

    <DashboardLayout>

    <div className="container-fluid">

    <div className="d-flex justify-content-between mb-4">

        <h2>Generator Management</h2>

        <input

        className="form-control"

        style={{width:250}}

        placeholder="Search Generator"

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        />

    </div>

    <div className="row">

    <div className="col-lg-4">

    <div className="card shadow">

    <div className="card-header">

    {editing?"Update Generator":"Register Generator"}

    </div>

    <div className="card-body">

    <form onSubmit={submit}>

    <select

    className="form-select mb-2"

    name="siteId"

    value={form.siteId}

    onChange={handleChange}

    required

    >

    <option value="">Select Site</option>

    {sites.map(site=>(

    <option

    key={site._id}

    value={site._id}

    >

    {site.siteName}

    </option>

    ))}

    </select>

    <input className="form-control mb-2" placeholder="Generator Name" name="generatorName" value={form.generatorName} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Capacity (kVA)" name="capacityKVA" value={form.capacityKVA} onChange={handleChange}/>

    <select className="form-select mb-2" name="fuelType" value={form.fuelType} onChange={handleChange}>

    <option>Diesel</option>

    <option>Gas</option>

    <option>Hybrid</option>

    </select>

    <input className="form-control mb-2" placeholder="Fuel Level (%)" name="fuelLevel" value={form.fuelLevel} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Fuel Consumption (L/hr)" name="fuelConsumption" value={form.fuelConsumption} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Running Hours" name="runningHours" value={form.runningHours} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Output Power (kW)" name="outputPower" value={form.outputPower} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Engine Temperature (°C)" name="engineTemperature" value={form.engineTemperature} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Oil Pressure (bar)" name="oilPressure" value={form.oilPressure} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Maintenance Due (Hours)" name="maintenanceDueHours" value={form.maintenanceDueHours} onChange={handleChange}/>

    <select className="form-select mb-3" name="status" value={form.status} onChange={handleChange}>

    <option>Running</option>

    <option>Stopped</option>

    <option>Maintenance</option>

    <option>Fault</option>

    </select>

    <button className="btn btn-success w-100">

    {editing?"Update Generator":"Register Generator"}

    </button>

    </form>

    </div>

    </div>

    </div>

    <div className="col-lg-8">

    <div className="card shadow">

    <div className="card-header">

    Generator Fleet

    </div>

    <div className="table-responsive">

    <table className="table table-striped">

    <thead className="table-dark">

    <tr>

    <th>Name</th>

    <th>Site</th>

    <th>Capacity</th>

    <th>Fuel (%)</th>

    <th>Runtime</th>

    <th>Status</th>

    <th>Action</th>

    </tr>

    </thead>

    <tbody>

    {filtered.map(item=>(

    <tr key={item._id}>

    <td>{item.generatorName}</td>

    <td>{item.siteId?.siteName}</td>

    <td>{item.capacityKVA} kVA</td>

    <td>{item.fuelLevel}%</td>

    <td>{item.runningHours} hrs</td>

    <td>

    <span className={`badge bg-${
    item.status==="Running"
    ?"success"
    :item.status==="Maintenance"
    ?"warning"
    :item.status==="Fault"
    ?"danger"
    :"secondary"
    }`}>

    {item.status}

    </span>

    </td>

    <td>

    <button className="btn btn-primary btn-sm me-2" onClick={()=>edit(item)}>

    Edit

    </button>

    <button className="btn btn-danger btn-sm" onClick={()=>remove(item._id)}>

    Delete

    </button>

    </td>

    </tr>

    ))}

    </tbody>

    </table>

    </div>

    </div>

    </div>

    </div>

    </div>

    </DashboardLayout>

    );

}