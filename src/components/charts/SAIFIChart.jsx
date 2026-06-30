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

import api from "../../api/axios.jsx";

export default function SAIFIChart() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSAIFI();

    }, []);

    async function loadSAIFI() {

        try {

            const res = await api.get("/analytics/saifi");

            const records =
                res.data.saifi ||
                res.data ||
                [];

            setData(records.map(item => ({

                period:
                    item.period,

                saifi:
                    item.saifi,

                target:
                    item.target || 1.5

            })));

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

                    Loading SAIFI...

                </div>

            </div>

        );

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-primary text-white">

                <strong>

                    SAIFI Trend Analysis

                </strong>

            </div>

            <div className="card-body">

                <ResponsiveContainer
                    width="100%"
                    height={380}
                >

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="period"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <ReferenceLine

                            y={1.5}

                            stroke="red"

                            strokeDasharray="5 5"

                            label="Target"

                        />

                        <Line

                            type="monotone"

                            dataKey="saifi"

                            stroke="#007bff"

                            strokeWidth={3}

                            dot={{ r: 5 }}

                            activeDot={{ r: 8 }}

                            name="SAIFI"

                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}