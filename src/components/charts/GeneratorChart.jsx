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

export default function GeneratorChart() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadGenerator();

    }, []);

    async function loadGenerator() {

        try {

            const res = await api.get("/generators");

            const generators =

                res.data.generators ||

                res.data ||

                [];

            const chartData = generators.map(item => ({

                time: new Date(

                    item.createdAt

                ).toLocaleTimeString([], {

                    hour: "2-digit",

                    minute: "2-digit"

                }),

                power:

                    item.power ||

                    item.outputPower ||

                    0,

                fuel:

                    item.fuelLevel ||

                    0,

                temperature:

                    item.temperature ||

                    item.engineTemperature ||

                    0,

                frequency:

                    item.frequency ||

                    0,

                rpm:

                    item.rpm ||

                    item.engineSpeed ||

                    0

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

                    Loading Generator Chart...

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-danger text-white">

                <strong>

                    Generator Performance

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

                            dataKey="power"

                            stroke="#007bff"

                            strokeWidth={3}

                            name="Power (kW)"

                        />

                        <Line

                            type="monotone"

                            dataKey="fuel"

                            stroke="#28a745"

                            strokeWidth={2}

                            name="Fuel (%)"

                        />

                        <Line

                            type="monotone"

                            dataKey="temperature"

                            stroke="#dc3545"

                            strokeWidth={2}

                            name="Temp (°C)"

                        />

                        <Line

                            type="monotone"

                            dataKey="frequency"

                            stroke="#ffc107"

                            strokeWidth={2}

                            name="Frequency (Hz)"

                        />

                        <Line

                            type="monotone"

                            dataKey="rpm"

                            stroke="#6f42c1"

                            strokeWidth={2}

                            name="RPM"

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}