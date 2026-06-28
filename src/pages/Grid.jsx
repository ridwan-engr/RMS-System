import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";

export default function Grid() {

    const [grids,setGrids]=useState([]);
    const [sites,setSites]=useState([]);
    const [editing,setEditing]=useState(null);
    const [search,setSearch]=useState("");

    const [form,setForm]=useState({

        siteId:"",

        feederName:"",

        voltage:"",

        frequency:"",

        activePower:"",

        reactivePower:"",

        apparentPower:"",

        powerFactor:"",

        availability:"",

        dailyOutages:"",

        monthlyOutages:"",

        SAIFI:"",

        SAIDI:"",

        ENS:"",

        LOLP:"",

        status:"Available"

    });

    useEffect(()=>{

        loadGrid();

        loadSites();

    },[]);

    async function loadGrid(){

        const res=await api.get("/grid");

        setGrids(res.data.grid||[]);

    }

    async function loadSites(){

        const res=await api.get("/sites");

        setSites(res.data.sites||[]);

    }

    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    }

    async function submit(e){

        e.preventDefault();

        if(editing){

            await api.put(`/grid/${editing}`,form);

        }

        else{

            await api.post("/grid",form);

        }

        reset();

        loadGrid();

    }

    async function remove(id){

        if(!window.confirm("Delete Grid Record?")) return;

        await api.delete(`/grid/${id}`);

        loadGrid();

    }

    function edit(item){

        setEditing(item._id);

        setForm(item);

    }

    function reset(){

        setEditing(null);

        setForm({

            siteId:"",

            feederName:"",

            voltage:"",

            frequency:"",

            activePower:"",

            reactivePower:"",

            apparentPower:"",

            powerFactor:"",

            availability:"",

            dailyOutages:"",

            monthlyOutages:"",

            SAIFI:"",

            SAIDI:"",

            ENS:"",

            LOLP:"",

            status:"Available"

        });

    }

    const filtered=grids.filter(

        g=>g.feederName

        ?.toLowerCase()

        .includes(search.toLowerCase())

    );

    return(

    <DashboardLayout>

    <div className="container-fluid">

    <div className="d-flex justify-content-between mb-4">

        <h2>Grid Monitoring</h2>

        <input

        className="form-control"

        style={{width:250}}

        placeholder="Search Feeder"

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        />

    </div>

    <div className="row">

    <div className="col-lg-4">

    <div className="card shadow">

    <div className="card-header">

    {editing?"Update Grid":"Register Grid"}

    </div>

    <div className="card-body">

    <form onSubmit={submit}>

    <select

    className="form-select mb-2"

    name="siteId"

    value={form.siteId}

    onChange={handleChange}

    >

    <option value="">Select Site</option>

    {sites.map(site=>(

    <option key={site._id} value={site._id}>

    {site.siteName}

    </option>

    ))}

    </select>

    <input className="form-control mb-2" placeholder="Feeder Name" name="feederName" value={form.feederName} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Voltage (V)" name="voltage" value={form.voltage} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Frequency (Hz)" name="frequency" value={form.frequency} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Active Power (kW)" name="activePower" value={form.activePower} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Reactive Power (kVAR)" name="reactivePower" value={form.reactivePower} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Apparent Power (kVA)" name="apparentPower" value={form.apparentPower} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Power Factor" name="powerFactor" value={form.powerFactor} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Availability (%)" name="availability" value={form.availability} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Daily Outages" name="dailyOutages" value={form.dailyOutages} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Monthly Outages" name="monthlyOutages" value={form.monthlyOutages} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="SAIFI" name="SAIFI" value={form.SAIFI} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="SAIDI (hrs)" name="SAIDI" value={form.SAIDI} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="ENS (kWh)" name="ENS" value={form.ENS} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="LOLP" name="LOLP" value={form.LOLP} onChange={handleChange}/>

    <select className="form-select mb-3" name="status" value={form.status} onChange={handleChange}>

        <option>Available</option>

        <option>Outage</option>

        <option>Maintenance</option>

    </select>

    <button className="btn btn-success w-100">

    {editing?"Update":"Register"}

    </button>

    </form>

    </div>

    </div>

    </div>

    <div className="col-lg-8">

    <div className="card shadow">

    <div className="card-header">

    Utility Grid Status

    </div>

    <div className="table-responsive">

    <table className="table table-hover">

    <thead className="table-dark">

    <tr>

    <th>Feeder</th>

    <th>Voltage</th>

    <th>Frequency</th>

    <th>Availability</th>

    <th>SAIFI</th>

    <th>SAIDI</th>

    <th>Status</th>

    <th>Action</th>

    </tr>

    </thead>

    <tbody>

    {filtered.map(item=>(

    <tr key={item._id}>

    <td>{item.feederName}</td>

    <td>{item.voltage} V</td>

    <td>{item.frequency} Hz</td>

    <td>{item.availability}%</td>

    <td>{item.SAIFI}</td>

    <td>{item.SAIDI} hrs</td>

    <td>

    <span className={`badge bg-${
    item.status==="Available"
    ?"success"
    :item.status==="Maintenance"
    ?"warning"
    :"danger"
    }`}>

    {item.status}

    </span>

    </td>

    <td>

    <button
    className="btn btn-primary btn-sm me-2"
    onClick={()=>edit(item)}
    >
    Edit
    </button>

    <button
    className="btn btn-danger btn-sm"
    onClick={()=>remove(item._id)}
    >
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