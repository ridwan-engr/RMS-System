import { useEffect, useState } from "react";

import {

    ResponsiveContainer,

    LineChart,

    Line,

    CartesianGrid,

    Tooltip,

    Legend,

    XAxis,

    YAxis,

    ReferenceLine

} from "recharts";

import api from "../../api/axios.js";

export default function SAIDIChart() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSAIDI();

    }, []);

    async function loadSAIDI() {

        try {

            const response =
                await api.get("/analytics/saidi");

            const records =
                response.data.saidi ||
                response.data ||
                [];

            setData(

                records.map(item => ({

                    period: item.period,

                    saidi: item.saidi,

                    target:
                        item.target || 2.5

                }))

            );

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

                    Loading SAIDI...

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-success text-white">

                <strong>

                    SAIDI Trend Analysis

                </strong>

            </div>

            <div className="card-body">

                <ResponsiveContainer

                    width="100%"

                    height={380}

                >

                    <LineChart

                        data={data}

                    >

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="period"

                        />

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <ReferenceLine

                            y={2.5}

                            stroke="red"

                            strokeDasharray="5 5"

                            label="Target"

                        />

                        <Line

                            type="monotone"

                            dataKey="saidi"

                            stroke="#28a745"

                            strokeWidth={3}

                            dot={{ r: 5 }}

                            activeDot={{ r: 8 }}

                            name="SAIDI (Hours)"

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}