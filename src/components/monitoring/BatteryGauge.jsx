import { useEffect, useState } from "react";

import GaugeComponent from "react-gauge-component";

import api from "../../api/axios.js";

import socket from "../../api/socket.js";

export default function BatteryGauge() {

    const [battery, setBattery] = useState({

        soc: 0,

        voltage: 0,

        current: 0,

        power: 0,

        temperature: 0,

        health: 0,

        runtime: 0,

        status: "Idle",

        alarm: false

    });

    useEffect(() => {

        loadBattery();

        socket.connect();

        socket.on("battery:update", updateBattery);

        return () => {

            socket.off("battery:update", updateBattery);

            socket.disconnect();

        };

    }, []);

    async function loadBattery() {

        try {

            const response =

                await api.get("/batteries/live");

            setBattery(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    function updateBattery(data) {

        setBattery(data);

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-success text-white">

                <strong>

                    Battery Monitoring

                </strong>

            </div>

            <div className="card-body">

                <GaugeComponent

                    value={battery.soc}

                    type="radial"

                    labels={{

                        valueLabel: {

                            formatTextValue: value => `${value}%`

                        }

                    }}

                    arc={{

                        subArcs:[

                            {

                                limit:20,

                                color:"#dc3545"

                            },

                            {

                                limit:50,

                                color:"#ffc107"

                            },

                            {

                                limit:100,

                                color:"#28a745"

                            }

                        ]

                    }}

                />

                <table className="table mt-4">

                    <tbody>

                        <tr>

                            <th>Status</th>

                            <td>{battery.status}</td>

                        </tr>

                        <tr>

                            <th>Voltage</th>

                            <td>{battery.voltage} V</td>

                        </tr>

                        <tr>

                            <th>Current</th>

                            <td>{battery.current} A</td>

                        </tr>

                        <tr>

                            <th>Power</th>

                            <td>{battery.power} kW</td>

                        </tr>

                        <tr>

                            <th>Temperature</th>

                            <td>{battery.temperature} °C</td>

                        </tr>

                        <tr>

                            <th>State of Health</th>

                            <td>{battery.health}%</td>

                        </tr>

                        <tr>

                            <th>Estimated Runtime</th>

                            <td>{battery.runtime} Hours</td>

                        </tr>

                        <tr>

                            <th>Alarm</th>

                            <td>

                                {

                                    battery.alarm

                                    ?

                                    <span className="badge bg-danger">

                                        ACTIVE

                                    </span>

                                    :

                                    <span className="badge bg-success">

                                        NORMAL

                                    </span>

                                }

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}