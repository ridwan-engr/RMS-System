import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayouts.jsx";
import api from "../api/axios.js";

export default function Solar() {

    const [solarPlants, setSolarPlants] = useState([]);
    const [sites, setSites] = useState([]);
    const [search, setSearch] = useState("");

    const [editing, setEditing] = useState(null);

    const [form, setForm] = useState({

        siteId: "",

        plantName: "",

        capacityKW: "",

        inverterEfficiency: "",

        dailyGeneration: "",

        performanceRatio: "",

        status: "Running"

    });

    useEffect(() => {

        loadSolar();

        loadSites();

    }, []);

    async function loadSolar() {

        const res = await api.get("/solar");

        setSolarPlants(res.data.solar || []);

    }

    async function loadSites() {

        const res = await api.get("/sites");

        setSites(res.data.sites || []);

    }

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function submit(e) {

        e.preventDefault();

        try {

            if (editing) {

                await api.put(

                    `/solar/${editing}`,

                    form

                );

            }

            else {

                await api.post(

                    "/solar",

                    form

                );

            }

            reset();

            loadSolar();

        }

        catch (err) {

            console.error(err);

        }

    }

    async function remove(id) {

        if (!window.confirm("Delete Solar Plant?"))

            return;

        await api.delete(`/solar/${id}`);

        loadSolar();

    }

    function edit(item) {

        setEditing(item._id);

        setForm(item);

    }

    function reset() {

        setEditing(null);

        setForm({

            siteId: "",

            plantName: "",

            capacityKW: "",

            inverterEfficiency: "",

            dailyGeneration: "",

            performanceRatio: "",

            status: "Running"

        });

    }

    const filtered = solarPlants.filter(

        p =>

            p.plantName

            ?.toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <DashboardLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between mb-4">

                    <h2>Solar Plant Management</h2>

                    <input

                        className="form-control"

                        style={{ width: 250 }}

                        placeholder="Search"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

                <div className="row">

                    <div className="col-lg-4">

                        <div className="card shadow">

                            <div className="card-header">

                                {editing ? "Update Solar Plant" : "Register Solar Plant"}

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

                                        <option value="">

                                            Select Site

                                        </option>

                                        {

                                            sites.map(site => (

                                                <option

                                                    key={site._id}

                                                    value={site._id}

                                                >

                                                    {site.siteName}

                                                </option>

                                            ))

                                        }

                                    </select>

                                    <input

                                        className="form-control mb-2"

                                        placeholder="Plant Name"

                                        name="plantName"

                                        value={form.plantName}

                                        onChange={handleChange}

                                    />

                                    <input

                                        className="form-control mb-2"

                                        placeholder="Capacity (kW)"

                                        name="capacityKW"

                                        value={form.capacityKW}

                                        onChange={handleChange}

                                    />

                                    <input

                                        className="form-control mb-2"

                                        placeholder="Inverter Efficiency (%)"

                                        name="inverterEfficiency"

                                        value={form.inverterEfficiency}

                                        onChange={handleChange}

                                    />

                                    <input

                                        className="form-control mb-2"

                                        placeholder="Daily Generation (kWh)"

                                        name="dailyGeneration"

                                        value={form.dailyGeneration}

                                        onChange={handleChange}

                                    />

                                    <input

                                        className="form-control mb-3"

                                        placeholder="Performance Ratio (%)"

                                        name="performanceRatio"

                                        value={form.performanceRatio}

                                        onChange={handleChange}

                                    />

                                    <select

                                        className="form-select mb-3"

                                        name="status"

                                        value={form.status}

                                        onChange={handleChange}

                                    >

                                        <option>Running</option>

                                        <option>Maintenance</option>

                                        <option>Offline</option>

                                    </select>

                                    <button

                                        className="btn btn-success w-100"

                                    >

                                        {

                                            editing

                                                ? "Update"

                                                : "Create"

                                        }

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-8">

                        <div className="card shadow">

                            <div className="card-header">

                                Solar Plants

                            </div>

                            <div className="table-responsive">

                                <table className="table table-striped">

                                    <thead>

                                        <tr>

                                            <th>Plant</th>

                                            <th>Site</th>

                                            <th>Capacity</th>

                                            <th>Generation</th>

                                            <th>PR</th>

                                            <th>Status</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            filtered.map(item => (

                                                <tr key={item._id}>

                                                    <td>{item.plantName}</td>

                                                    <td>{item.siteId?.siteName}</td>

                                                    <td>{item.capacityKW} kW</td>

                                                    <td>{item.dailyGeneration} kWh</td>

                                                    <td>{item.performanceRatio}%</td>

                                                    <td>

                                                        <span className={`badge bg-${
                                                            item.status === "Running"
                                                                ? "success"
                                                                : item.status === "Maintenance"
                                                                ? "warning"
                                                                : "danger"
                                                        }`}>

                                                            {item.status}

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <button

                                                            className="btn btn-primary btn-sm me-2"

                                                            onClick={() => edit(item)}

                                                        >

                                                            Edit

                                                        </button>

                                                        <button

                                                            className="btn btn-danger btn-sm"

                                                            onClick={() => remove(item._id)}

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