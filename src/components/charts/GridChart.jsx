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

import api from "../../api/axios.js";

export default function GridChart() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadGrid();

    }, []);

    async function loadGrid() {

        try {

            const response =
                await api.get("/grid");

            const records =
                response.data.grid ||
                response.data ||
                [];

            const chartData =
                records.map(item => ({

                    time: new Date(
                        item.createdAt
                    ).toLocaleTimeString([], {

                        hour: "2-digit",

                        minute: "2-digit"

                    }),

                    voltage:
                        item.voltage || 0,

                    current:
                        item.current || 0,

                    frequency:
                        item.frequency || 0,

                    powerFactor:
                        item.powerFactor || 0,

                    activePower:
                        item.activePower || 0

                }));

            setData(chartData);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="card shadow">

                <div className="card-body">

                    Loading Grid Chart...

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-primary text-white">

                <strong>

                    Utility Grid Monitoring

                </strong>

            </div>

            <div className="card-body">

                <ResponsiveContainer
                    width="100%"
                    height={360}
                >

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="time"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Line
                            type="monotone"
                            dataKey="voltage"
                            stroke="#007bff"
                            strokeWidth={2}
                            name="Voltage (V)"
                        />

                        <Line
                            type="monotone"
                            dataKey="current"
                            stroke="#28a745"
                            strokeWidth={2}
                            name="Current (A)"
                        />

                        <Line
                            type="monotone"
                            dataKey="frequency"
                            stroke="#dc3545"
                            strokeWidth={2}
                            name="Frequency (Hz)"
                        />

                        <Line
                            type="monotone"
                            dataKey="powerFactor"
                            stroke="#ffc107"
                            strokeWidth={2}
                            name="Power Factor"
                        />

                        <Line
                            type="monotone"
                            dataKey="activePower"
                            stroke="#6f42c1"
                            strokeWidth={3}
                            name="Power (kW)"
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}