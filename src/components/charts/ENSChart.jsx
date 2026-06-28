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

    YAxis,

    ReferenceLine

} from "recharts";

import api from "../../api/axios";

export default function ENSChart() {

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadENS();

    }, []);

    async function loadENS() {

        try {

            const response =

                await api.get("/analytics/ens");

            const records =

                response.data.ens ||

                response.data ||

                [];

            setData(

                records.map(item => ({

                    period:

                        item.period,

                    ens:

                        item.ens,

                    target:

                        item.target || 0,

                    demand:

                        item.loadDemand || 0,

                    supplied:

                        item.energySupplied || 0

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

                    Loading ENS Chart...

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-danger text-white">

                <strong>

                    Energy Not Supplied (ENS)

                </strong>

            </div>

            <div className="card-body">

                <ResponsiveContainer

                    width="100%"

                    height={420}

                >

                    <ComposedChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="period"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <ReferenceLine

                            y={0}

                            stroke="green"

                            strokeDasharray="5 5"

                            label="Ideal"

                        />

                        <Bar

                            dataKey="ens"

                            fill="#dc3545"

                            name="ENS (kWh)"

                        />

                        <Line

                            dataKey="demand"

                            stroke="#007bff"

                            strokeWidth={3}

                            name="Demand"

                        />

                        <Line

                            dataKey="supplied"

                            stroke="#28a745"

                            strokeWidth={3}

                            name="Supplied"

                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}