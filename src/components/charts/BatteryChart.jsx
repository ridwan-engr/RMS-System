import { useEffect, useState } from "react";

import {

    ResponsiveContainer,

    LineChart,

    Line,

    CartesianGrid,

    Tooltip,

    Legend,

    XAxis,

    YAxis

} from "recharts";

import api from "../../api/axios.jsx";

export default function BatteryChart() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBattery();

    }, []);

    async function loadBattery() {

        try {

            const res = await api.get("/batteries");

            const batteries =

                res.data.batteries ||

                res.data ||

                [];

            const chartData = batteries.map(item => ({

                time: new Date(

                    item.createdAt

                ).toLocaleTimeString([], {

                    hour: "2-digit",

                    minute: "2-digit"

                }),

                soc:

                    item.soc ||

                    item.stateOfCharge ||

                    0,

                soh:

                    item.soh ||

                    item.stateOfHealth ||

                    0,

                voltage:

                    item.voltage ||

                    0,

                temperature:

                    item.temperature ||

                    0

            }));

            setData(chartData);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="card shadow">

                <div className="card-body">

                    Loading Battery Chart...

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-success text-white">

                <strong>

                    Battery Performance

                </strong>

            </div>

            <div className="card-body">

                <ResponsiveContainer

                    width="100%"

                    height={350}

                >

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="time"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Line

                            type="monotone"

                            dataKey="soc"

                            stroke="#28a745"

                            strokeWidth={3}

                            name="SOC (%)"

                        />

                        <Line

                            type="monotone"

                            dataKey="soh"

                            stroke="#007bff"

                            strokeWidth={2}

                            name="SOH (%)"

                        />

                        <Line

                            type="monotone"

                            dataKey="voltage"

                            stroke="#ffc107"

                            strokeWidth={2}

                            name="Voltage (V)"

                        />

                        <Line

                            type="monotone"

                            dataKey="temperature"

                            stroke="#dc3545"

                            strokeWidth={2}

                            name="Temperature (°C)"

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}