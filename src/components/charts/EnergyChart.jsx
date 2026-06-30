import { useEffect, useState } from "react";

import {

    ResponsiveContainer,

    ComposedChart,

    Bar,

    Line,

    CartesianGrid,

    Tooltip,

    Legend,

    XAxis,

    YAxis

} from "recharts";

import api from "../../api/axios.jsx";

export default function EnergyChart() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadEnergy();

    }, []);

    async function loadEnergy() {

        try {

            const response =
                await api.get("/energy");

            const records =
                response.data.energy ||
                response.data ||
                [];

            const chartData = records.map(item => ({

                time: new Date(
                    item.createdAt
                ).toLocaleTimeString([], {

                    hour: "2-digit",

                    minute: "2-digit"

                }),

                solar:
                    item.solarPower || 0,

                battery:
                    item.batteryPower || 0,

                generator:
                    item.generatorPower || 0,

                grid:
                    item.gridPower || 0,

                load:
                    item.loadPower || 0,

                renewable:
                    item.renewableContribution || 0

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

                    Loading Energy Chart...

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-success text-white">

                <strong>

                    Hybrid Energy Dispatch

                </strong>

            </div>

            <div className="card-body">

                <ResponsiveContainer

                    width="100%"

                    height={380}

                >

                    <ComposedChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="time"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Bar

                            dataKey="solar"

                            fill="#f39c12"

                            name="Solar"

                        />

                        <Bar

                            dataKey="battery"

                            fill="#27ae60"

                            name="Battery"

                        />

                        <Bar

                            dataKey="generator"

                            fill="#c0392b"

                            name="Generator"

                        />

                        <Bar

                            dataKey="grid"

                            fill="#2980b9"

                            name="Grid"

                        />

                        <Line

                            type="monotone"

                            dataKey="load"

                            stroke="#000"

                            strokeWidth={3}

                            name="Load"

                        />

                        <Line

                            type="monotone"

                            dataKey="renewable"

                            stroke="#8e44ad"

                            strokeWidth={2}

                            name="Renewable %"

                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}