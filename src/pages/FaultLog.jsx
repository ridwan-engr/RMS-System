import { useEffect, useState } from "react";
import DashboardLayouts from "../layouts/DashboardLayout.jsx";
import api from "../api/axios.js";

export default function Faults() {

    const [faults,setFaults]=useState([]);

    const [sites,setSites]=useState([]);

    const [search,setSearch]=useState("");

    const [editing,setEditing]=useState(null);

    const [form,setForm]=useState({

        siteId:"",

        equipment:"",

        faultCode:"",

        faultCategory:"",

        severity:"Critical",

        description:"",

        rootCause:"",

        technician:"",

        status:"Open",

        acknowledged:false,

        downtime:0,

        mttr:0

    });

    useEffect(()=>{

        loadFaults();

        loadSites();

    },[]);

    async function loadFaults(){

        const res=await api.get("/faults");

        setFaults(res.data.faults||[]);

    }

    async function loadSites(){

        const res=await api.get("/sites");

        setSites(res.data.sites||[]);

    }

    function handleChange(e){

        const {name,value,type,checked}=e.target;

        setForm({

            ...form,

            [name]:

            type==="checkbox"

            ?checked

            :value

        });

    }

    async function submit(e){

        e.preventDefault();

        if(editing){

            await api.put(

                `/faults/${editing}`,

                form

            );

        }

        else{

            await api.post(

                "/faults",

                form

            );

        }

        reset();

        loadFaults();

    }

    async function remove(id){

        if(!window.confirm("Delete Fault?"))

        return;

        await api.delete(`/faults/${id}`);

        loadFaults();

    }

    function edit(item){

        setEditing(item._id);

        setForm(item);

    }

    function reset(){

        setEditing(null);

        setForm({

            siteId:"",

            equipment:"",

            faultCode:"",

            faultCategory:"",

            severity:"Critical",

            description:"",

            rootCause:"",

            technician:"",

            status:"Open",

            acknowledged:false,

            downtime:0,

            mttr:0

        });

    }

    const filtered=faults.filter(

        f=>

        f.equipment

        ?.toLowerCase()

        .includes(search.toLowerCase())

    );

    return(

    <DashboardLayout>

    <div className="container-fluid">

    <div className="d-flex justify-content-between mb-4">

    <h2>

    Fault & Alarm Management

    </h2>

    <input

    className="form-control"

    style={{width:250}}

    placeholder="Search Equipment"

    value={search}

    onChange={(e)=>setSearch(e.target.value)}

    />

    </div>

    <div className="row">

    <div className="col-lg-4">

    <div className="card shadow">

    <div className="card-header">

    {editing

    ?"Update Fault"

    :"Create Fault"}

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

    <input className="form-control mb-2" placeholder="Equipment" name="equipment" value={form.equipment} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Fault Code" name="faultCode" value={form.faultCode} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Fault Category" name="faultCategory" value={form.faultCategory} onChange={handleChange}/>

    <textarea className="form-control mb-2" placeholder="Description" name="description" value={form.description} onChange={handleChange}/>

    <textarea className="form-control mb-2" placeholder="Root Cause" name="rootCause" value={form.rootCause} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="Assigned Technician" name="technician" value={form.technician} onChange={handleChange}/>

    <select className="form-select mb-2" name="severity" value={form.severity} onChange={handleChange}>

    <option>Critical</option>

    <option>Major</option>

    <option>Minor</option>

    <option>Warning</option>

    </select>

    <select className="form-select mb-2" name="status" value={form.status} onChange={handleChange}>

    <option>Open</option>

    <option>Assigned</option>

    <option>In Progress</option>

    <option>Resolved</option>

    <option>Closed</option>

    </select>

    <input className="form-control mb-2" placeholder="Downtime (hrs)" name="downtime" value={form.downtime} onChange={handleChange}/>

    <input className="form-control mb-2" placeholder="MTTR (hrs)" name="mttr" value={form.mttr} onChange={handleChange}/>

    <div className="form-check mb-3">

    <input

    type="checkbox"

    className="form-check-input"

    name="acknowledged"

    checked={form.acknowledged}

    onChange={handleChange}

    />

    <label className="form-check-label">

    Acknowledged

    </label>

    </div>

    <button className="btn btn-danger w-100">

    {editing?"Update":"Register"}

    </button>

    </form>

    </div>

    </div>

    </div>

    <div className="col-lg-8">

    <div className="card shadow">

    <div className="card-header">

    Active Faults

    </div>

    <div className="table-responsive">

    <table className="table table-hover">

    <thead className="table-dark">

    <tr>

    <th>Equipment</th>

    <th>Severity</th>

    <th>Status</th>

    <th>Technician</th>

    <th>Downtime</th>

    <th>Action</th>

    </tr>

    </thead>

    <tbody>

    {

    filtered.map(item=>(

    <tr key={item._id}>

    <td>{item.equipment}</td>

    <td>

    <span className={`badge bg-${
        item.severity==="Critical"
        ?"danger"
        :item.severity==="Major"
        ?"warning"
        :item.severity==="Minor"
        ?"primary"
        :"secondary"
    }`}>

    {item.severity}

    </span>

    </td>

    <td>{item.status}</td>

    <td>{item.technician}</td>

    <td>{item.downtime} hrs</td>

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

    ))

    }

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

