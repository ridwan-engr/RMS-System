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

export default function ForecastChart() {

    const [forecast, setForecast] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadForecast();

    }, []);

    async function loadForecast() {

        try {

            const response =

                await api.get("/forecasts");

            const records =

                response.data.forecasts ||

                response.data ||

                [];

            const chartData =

                records.map(item => ({

                    hour:

                        item.hour ||

                        item.time ||

                        "",

                    solar:

                        item.solarForecast ||

                        0,

                    load:

                        item.loadForecast ||

                        0,

                    battery:

                        item.batterySOC ||

                        0,

                    renewable:

                        item.renewableForecast ||

                        0,

                    diesel:

                        item.generatorForecast ||

                        0,

                    confidence:

                        item.confidence ||

                        100

                }));

            setForecast(chartData);

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

                    Loading Forecast...

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-info text-white">

                <strong>

                    24-Hour Energy Forecast

                </strong>

            </div>

            <div className="card-body">

                <ResponsiveContainer

                    width="100%"

                    height={400}

                >

                    <LineChart

                        data={forecast}

                    >

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="hour"

                        />

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Line

                            type="monotone"

                            dataKey="solar"

                            stroke="#f39c12"

                            strokeWidth={3}

                            name="Solar Forecast"

                        />

                        <Line

                            type="monotone"

                            dataKey="load"

                            stroke="#2c3e50"

                            strokeWidth={3}

                            name="Load Forecast"

                        />

                        <Line

                            type="monotone"

                            dataKey="battery"

                            stroke="#27ae60"

                            strokeWidth={2}

                            name="Battery SOC"

                        />

                        <Line

                            type="monotone"

                            dataKey="renewable"

                            stroke="#8e44ad"

                            strokeWidth={2}

                            name="Renewable %"

                        />

                        <Line

                            type="monotone"

                            dataKey="diesel"

                            stroke="#c0392b"

                            strokeWidth={2}

                            name="Generator Forecast"

                        />

                        <Line

                            type="monotone"

                            dataKey="confidence"

                            stroke="#2980b9"

                            strokeDasharray="5 5"

                            strokeWidth={2}

                            name="Confidence"

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}