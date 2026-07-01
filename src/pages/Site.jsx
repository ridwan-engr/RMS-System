import {

    useEffect,

    useState

} from "react";

import DashboardLayouts
from "../layouts/DashboardLayout.jsx";

import api
from "../api/axios.js";

export default function Sites(){

    const [sites,setSites]=useState([]);

    const [search,setSearch]=useState("");

    const [editing,setEditing]=useState(null);

    const [form,setForm]=useState({

        siteName:"",

        location:"",

        state:"",

        latitude:"",

        longitude:"",

        status:"Active"

    });

    useEffect(()=>{

        loadSites();

    },[]);

    async function loadSites(){

        try{

            const res=
            await api.get("/sites");

            setSites(res.data.sites);

        }

        catch(err){

            console.error(err);

        }

    }

    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]:

            e.target.value

        });

    }

    async function handleSubmit(e){

        e.preventDefault();

        try{

            if(editing){

                await api.put(

                    `/sites/${editing}`,

                    form

                );

            }

            else{

                await api.post(

                    "/sites",

                    form

                );

            }

            resetForm();

            loadSites();

        }

        catch(err){

            console.error(err);

        }

    }

    function editSite(site){

        setEditing(site._id);

        setForm(site);

    }

    async function deleteSite(id){

        if(

            !window.confirm(

                "Delete Site?"

            )

        ) return;

        await api.delete(

            `/sites/${id}`

        );

        loadSites();

    }

    function resetForm(){

        setEditing(null);

        setForm({

            siteName:"",

            location:"",

            status:"",

            latitude:"",

            longitude:"",

            siteType:"",

            commissioningDate:""

        });

    }

    const filtered=

        sites.filter(

            s=>

            s.siteName

            .toLowerCase()

            .includes(

                search.toLowerCase()

            )

        );

    return(

    <DashboardLayout>

    <div className="container-fluid">

    <div className="d-flex justify-content-between mb-4">

        <h2>

            Site Management

        </h2>

        <input

        className="form-control"

        placeholder="Search Site"

        style={{width:250}}

        value={search}

        onChange={(e)=>

        setSearch(

        e.target.value

        )}

        />

    </div>

    <div className="row">

    <div className="col-lg-4">

    <div className="card shadow">

    <div className="card-header">

    {

    editing?

    "Update Site":

    "Register Site"

    }

    </div>

    <div className="card-body">

    <form onSubmit={handleSubmit}>

    <input

    className="form-control mb-2"

    placeholder="Site Name"

    name="siteName"

    value={form.siteName}

    onChange={handleChange}

    required

    />

    <input

    className="form-control mb-2"

    placeholder="Location"

    name="location"

    value={form.location}

    onChange={handleChange}

    />

    <input

    className="form-control mb-2"

    placeholder="State"

    name="state"

    value={form.state}

    onChange={handleChange}

    />


    <input

    className="form-control mb-2"

    placeholder="Latitude"

    name="latitude"

    value={form.latitude}

    onChange={handleChange}

    />

    <input

    className="form-control mb-2"

    placeholder="Longitude"

    name="longitude"

    value={form.longitude}

    onChange={handleChange}

    />

    <select

    className="form-select mb-3"

    name="status"

    value={form.status}

    onChange={handleChange}

    >

    <option>

    Active

    </option>

    <option>

    Offline

    </option>

    <option>

    Maintenance

    </option>

    </select>

    <button

    className="btn btn-success w-100"

    >

    {

    editing?

    "Update":

    "Create"

    }

    </button>

    </form>

    </div>

    </div>

    </div>

    <div className="col-lg-8">

    <div className="card shadow">

    <div className="card-header">

    Registered Sites

    </div>

    <div className="table-responsive">

    <table className="table table-striped">

    <thead>

    <tr>

    <th>Name</th>

    <th>Location</th>

    <th>Status</th>

    <th>Action</th>

    </tr>

    </thead>

    <tbody>

    {

    filtered.map(site=>(

    <tr key={site._id}>

    <td>

    {site.siteName}

    </td>

    <td>

    {site.location}

    </td>

    <td>

    <span className={`badge bg-${
    site.status==="Active"
    ?"success"
    :site.status==="Maintenance"
    ?"warning"
    :"danger"
    }`}>

    {site.status}

    </span>

    </td>

    <td>

    <button

    className="btn btn-primary btn-sm me-2"

    onClick={()=>editSite(site)}

    >

    Edit

    </button>

    <button

    className="btn btn-danger btn-sm"

    onClick={()=>deleteSite(site._id)}

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