import { useEffect, useState } from "react";

import {

    ResponsiveContainer,

    AreaChart,

    Area,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

    Legend

} from "recharts";

import api from "../../api/axios";

export default function SolarChart(){

    const [data,setData]=useState([]);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadChart();

    },[]);

    async function loadChart(){

        try{

            const res=

            await api.get("/solar");

            const records=

            res.data.solar ||

            res.data ||

            [];

            const chartData=

            records.map(item=>({

                time:

                new Date(

                item.createdAt

                ).toLocaleTimeString([],{

                    hour:"2-digit",

                    minute:"2-digit"

                }),

                power:

                item.power ||

                item.output ||

                item.powerOutput ||

                0,

                irradiance:

                item.irradiance ||

                0

            }));

            setData(chartData);

        }

        catch(error){

            console.error(

            error

            );

        }

        finally{

            setLoading(false);

        }

    }

    if(loading){

        return(

        <div className="card shadow">

        <div className="card-body">

        Loading Solar Chart...

        </div>

        </div>

        );

    }

    return(

    <div className="card shadow">

    <div className="card-header bg-warning">

    <strong>

    Solar Power Generation

    </strong>

    </div>

    <div className="card-body">

    <ResponsiveContainer

    width="100%"

    height={320}

    >

    <AreaChart

    data={data}

    >

    <CartesianGrid

    strokeDasharray="3 3"

    />

    <XAxis

    dataKey="time"

    />

    <YAxis/>

    <Tooltip/>

    <Legend/>

    <Area

    type="monotone"

    dataKey="power"

    stroke="#f39c12"

    fill="#f39c12"

    fillOpacity={0.5}

    name="Power (kW)"

    />

    <Area

    type="monotone"

    dataKey="irradiance"

    stroke="#3498db"

    fill="#3498db"

    fillOpacity={0.2}

    name="Irradiance"

    />

    </AreaChart>

    </ResponsiveContainer>

    </div>

    </div>

    );

}