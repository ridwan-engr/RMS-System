import { useEffect, useState } from "react";

import api from "../../api/axios";

import socket from "../../api/socket";

export default function AlarmPanel() {

    const [alarms, setAlarms] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAlarms();

        socket.connect();

        socket.on("alarm:new", addAlarm);

        socket.on("alarm:update", updateAlarm);

        return () => {

            socket.off("alarm:new", addAlarm);

            socket.off("alarm:update", updateAlarm);

            socket.disconnect();

        };

    }, []);

    async function loadAlarms() {

        try {

            const response =

                await api.get("/faults/alarms");

            setAlarms(

                response.data.alarms ||

                response.data ||

                []

            );

        }

        catch(error){

            console.error(error);

        }

        finally{

            setLoading(false);

        }

    }

    function addAlarm(alarm){

        setAlarms(previous=>[

            alarm,

            ...previous

        ]);

    }

    function updateAlarm(updated){

        setAlarms(previous=>

            previous.map(alarm=>

                alarm._id===updated._id

                ? updated

                : alarm

            )

        );

    }

    function badge(level){

        switch(level){

            case "Critical":

                return "bg-danger";

            case "Major":

                return "bg-warning text-dark";

            case "Minor":

                return "bg-info";

            case "Info":

                return "bg-secondary";

            default:

                return "bg-light text-dark";

        }

    }

    async function acknowledge(id){

        try{

            await api.put(

                `/faults/alarms/${id}/acknowledge`

            );

        }

        catch(error){

            console.error(error);

        }

    }

    if(loading){

        return(

            <div className="card shadow">

                <div className="card-body">

                    Loading Alarm Panel...

                </div>

            </div>

        );

    }

    return(

        <div className="card shadow">

            <div className="card-header bg-danger text-white">

                <strong>

                    Live Alarm Console

                </strong>

            </div>

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Time</th>

                                <th>Site</th>

                                <th>Severity</th>

                                <th>Equipment</th>

                                <th>Alarm</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                        {

                        alarms.length===0

                        ?

                        (

                        <tr>

                            <td

                            colSpan={7}

                            className="text-center"

                            >

                            No Active Alarm

                            </td>

                        </tr>

                        )

                        :

                        alarms.map(alarm=>(

                        <tr key={alarm._id}>

                            <td>

                            {

                            new Date(

                            alarm.createdAt

                            ).toLocaleString()

                            }

                            </td>

                            <td>

                            {alarm.siteName}

                            </td>

                            <td>

                            <span

                            className={`badge ${badge(alarm.severity)}`}

                            >

                            {alarm.severity}

                            </span>

                            </td>

                            <td>

                            {alarm.equipment}

                            </td>

                            <td>

                            {alarm.message}

                            </td>

                            <td>

                            {

                            alarm.acknowledged

                            ?

                            <span className="text-success">

                            Acknowledged

                            </span>

                            :

                            <span className="text-danger">

                            Active

                            </span>

                            }

                            </td>

                            <td>

                            {

                            !alarm.acknowledged &&

                            <button

                            className="btn btn-sm btn-success"

                            onClick={()=>

                            acknowledge(alarm._id)

                            }

                            >

                            ACK

                            </button>

                            }

                            </td>

                        </tr>

                        ))

                        }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}