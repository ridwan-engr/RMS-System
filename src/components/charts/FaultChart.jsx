import { useEffect, useState } from "react";

import {

    ResponsiveContainer,

    BarChart,

    Bar,

    Line,

    ComposedChart,

    CartesianGrid,

    Tooltip,

    Legend,

    XAxis,

    YAxis,

    Cell

} from "recharts";

import api from "../../api/axios";

const COLORS = {

    Critical:"#dc3545",

    Major:"#fd7e14",

    Minor:"#ffc107",

    Warning:"#20c997"

};

export default function FaultChart(){

    const [faults,setFaults]=useState([]);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadFaults();

    },[]);

    async function loadFaults(){

        try{

            const res=

            await api.get("/faults");

            const records=

            res.data.faults ||

            res.data ||

            [];

            const chart=

            records.map(item=>({

                date:

                new Date(

                    item.createdAt

                ).toLocaleDateString(),

                active:

                item.activeFaults ||

                0,

                resolved:

                item.resolvedFaults ||

                0,

                mttr:

                item.mttr ||

                0,

                mtbf:

                item.mtbf ||

                0,

                severity:

                item.severity ||

                "Minor"

            }));

            setFaults(chart);

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    }

    if(loading){

        return(

        <div className="card shadow">

        <div className="card-body">

        Loading Fault Analytics...

        </div>

        </div>

        );

    }

    return(

    <div className="card shadow">

    <div className="card-header bg-danger text-white">

    <strong>

    Fault Analytics Dashboard

    </strong>

    </div>

    <div className="card-body">

    <ResponsiveContainer

    width="100%"

    height={420}

    >

    <ComposedChart

    data={faults}

    >

    <CartesianGrid strokeDasharray="3 3"/>

    <XAxis dataKey="date"/>

    <YAxis/>

    <Tooltip/>

    <Legend/>

    <Bar

    dataKey="active"

    name="Active Faults"

    >

    {

    faults.map((entry,index)=>(

    <Cell

    key={index}

    fill={

    COLORS[entry.severity]

    }

    />

    ))

    }

    </Bar>

    <Bar

    dataKey="resolved"

    fill="#28a745"

    name="Resolved"

    />

    <Line

    dataKey="mttr"

    stroke="#0d6efd"

    strokeWidth={3}

    name="MTTR (hrs)"

    />

    <Line

    dataKey="mtbf"

    stroke="#6f42c1"

    strokeWidth={3}

    name="MTBF (hrs)"

    />

    </ComposedChart>

    </ResponsiveContainer>

    </div>

    </div>

    );

}