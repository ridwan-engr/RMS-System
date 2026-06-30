import { useEffect, useState } from "react";

import {

    ResponsiveContainer,

    AreaChart,

    Area,

    Line,

    CartesianGrid,

    Tooltip,

    Legend,

    XAxis,

    YAxis,

    ReferenceLine

} from "recharts";

import api from "../../api/axios.jsx";

export default function LOLPChart() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadLOLP();

    }, []);

    async function loadLOLP() {

        try {

            const response =

                await api.get("/analytics/lolp");

            const records =

                response.data.lolp ||

                response.data ||

                [];

            const chart =

                records.map(item => ({

                    period:

                        item.period,

                    lolp:

                        item.lolp,

                    target:

                        item.target ?? 0.05,

                    reserve:

                        item.reserveMargin ?? 0,

                    load:

                        item.loadDemand ?? 0

                }));

            setData(chart);

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

                    Loading LOLP...

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-dark text-white">

                <strong>

                    Loss of Load Probability (LOLP)

                </strong>

            </div>

            <div className="card-body">

                <ResponsiveContainer

                    width="100%"

                    height={420}

                >

                    <AreaChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="period"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <ReferenceLine

                            y={0.05}

                            stroke="red"

                            strokeDasharray="5 5"

                            label="Target"

                        />

                        <Area

                            type="monotone"

                            dataKey="lolp"

                            fill="#dc3545"

                            stroke="#dc3545"

                            fillOpacity={0.35}

                            name="LOLP"

                        />

                        <Line

                            type="monotone"

                            dataKey="reserve"

                            stroke="#28a745"

                            strokeWidth={3}

                            name="Reserve Margin (%)"

                        />

                        <Line

                            type="monotone"

                            dataKey="load"

                            stroke="#007bff"

                            strokeWidth={3}

                            name="Load (kW)"

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}