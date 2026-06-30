import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import api from "../api/axios.js";

export default function Battery() {

    const [batteries, setBatteries] = useState([]);
    const [sites, setSites] = useState([]);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null);

    const [form, setForm] = useState({

        siteId: "",

        batteryName: "",

        chemistry: "Lithium-Ion",

        capacityKWh: "",

        voltage: "",

        current: "",

        stateOfCharge: "",

        stateOfHealth: "",

        chargeEfficiency: "",

        dischargeEfficiency: "",

        temperature: "",

        chargeCycles: "",

        status: "Healthy"

    });

    useEffect(() => {

        loadBatteries();

        loadSites();

    }, []);

    async function loadBatteries() {

        const res = await api.get("/batteries");

        setBatteries(res.data.batteries || []);

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

                    `/batteries/${editing}`,

                    form

                );

            }

            else {

                await api.post(

                    "/batteries",

                    form

                );

            }

            reset();

            loadBatteries();

        }

        catch (err) {

            console.error(err);

        }

    }

    async function remove(id) {

        if (!window.confirm("Delete Battery?")) return;

        await api.delete(`/batteries/${id}`);

        loadBatteries();

    }

    function edit(item) {

        setEditing(item._id);

        setForm(item);

    }

    function reset() {

        setEditing(null);

        setForm({

            siteId: "",

            batteryName: "",

            chemistry: "Lithium-Ion",

            capacityKWh: "",

            voltage: "",

            current: "",

            stateOfCharge: "",

            stateOfHealth: "",

            chargeEfficiency: "",

            dischargeEfficiency: "",

            temperature: "",

            chargeCycles: "",

            status: "Healthy"

        });

    }

    const filtered = batteries.filter(

        b =>

            b.batteryName

            ?.toLowerCase()

            .includes(search.toLowerCase())

    );

    return (

        <DashboardLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between mb-4">

                    <h2>Battery Energy Storage System</h2>

                    <input

                        className="form-control"

                        style={{ width: 250 }}

                        placeholder="Search Battery"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

                <div className="row">

                    <div className="col-lg-4">

                        <div className="card shadow">

                            <div className="card-header">

                                {editing ? "Update Battery" : "Register Battery"}

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

                                        {sites.map(site => (

                                            <option
                                                key={site._id}
                                                value={site._id}
                                            >

                                                {site.siteName}

                                            </option>

                                        ))}

                                    </select>

                                    <input className="form-control mb-2" placeholder="Battery Name" name="batteryName" value={form.batteryName} onChange={handleChange} />

                                    <select className="form-select mb-2" name="chemistry" value={form.chemistry} onChange={handleChange}>

                                        <option>Lithium-Ion</option>

                                        <option>Lead Acid</option>

                                        <option>LiFePO4</option>

                                        <option>AGM</option>

                                    </select>

                                    <input className="form-control mb-2" placeholder="Capacity (kWh)" name="capacityKWh" value={form.capacityKWh} onChange={handleChange} />

                                    <input className="form-control mb-2" placeholder="Voltage (V)" name="voltage" value={form.voltage} onChange={handleChange} />

                                    <input className="form-control mb-2" placeholder="Current (A)" name="current" value={form.current} onChange={handleChange} />

                                    <input className="form-control mb-2" placeholder="SOC (%)" name="stateOfCharge" value={form.stateOfCharge} onChange={handleChange} />

                                    <input className="form-control mb-2" placeholder="SOH (%)" name="stateOfHealth" value={form.stateOfHealth} onChange={handleChange} />

                                    <input className="form-control mb-2" placeholder="Charge Efficiency (%)" name="chargeEfficiency" value={form.chargeEfficiency} onChange={handleChange} />

                                    <input className="form-control mb-2" placeholder="Discharge Efficiency (%)" name="dischargeEfficiency" value={form.dischargeEfficiency} onChange={handleChange} />

                                    <input className="form-control mb-2" placeholder="Temperature (°C)" name="temperature" value={form.temperature} onChange={handleChange} />

                                    <input className="form-control mb-2" placeholder="Charge Cycles" name="chargeCycles" value={form.chargeCycles} onChange={handleChange} />

                                    <select className="form-select mb-3" name="status" value={form.status} onChange={handleChange}>

                                        <option>Healthy</option>

                                        <option>Charging</option>

                                        <option>Discharging</option>

                                        <option>Fault</option>

                                    </select>

                                    <button className="btn btn-success w-100">

                                        {editing ? "Update Battery" : "Register Battery"}

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-8">

                        <div className="card shadow">

                            <div className="card-header">

                                Battery Inventory

                            </div>

                            <div className="table-responsive">

                                <table className="table table-hover">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>Name</th>

                                            <th>Site</th>

                                            <th>SOC</th>

                                            <th>SOH</th>

                                            <th>Capacity</th>

                                            <th>Status</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filtered.map(item => (

                                            <tr key={item._id}>

                                                <td>{item.batteryName}</td>

                                                <td>{item.siteId?.siteName}</td>

                                                <td>{item.stateOfCharge}%</td>

                                                <td>{item.stateOfHealth}%</td>

                                                <td>{item.capacityKWh} kWh</td>

                                                <td>

                                                    <span className={`badge bg-${
                                                        item.status === "Healthy"
                                                            ? "success"
                                                            : item.status === "Charging"
                                                            ? "primary"
                                                            : item.status === "Discharging"
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