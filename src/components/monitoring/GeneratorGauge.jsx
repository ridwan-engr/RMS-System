import { useEffect, useState } from "react";

import GaugeComponent from "react-gauge-component";

import api from "../../api/axios";

import socket from "../../api/socket";

export default function GeneratorGauge() {

    const [generator, setGenerator] = useState({

        power: 0,

        fuelLevel: 0,

        runtime: 0,

        rpm: 0,

        oilPressure: 0,

        coolantTemp: 0,

        voltage: 0,

        current: 0,

        frequency: 0,

        status: "OFF",

        maintenanceHours: 0,

        alarm: false

    });

    useEffect(() => {

        loadGenerator();

        socket.connect();

        socket.on("generator:update", updateGenerator);

        return () => {

            socket.off("generator:update", updateGenerator);

            socket.disconnect();

        };

    }, []);

    async function loadGenerator() {

        try {

            const response =
                await api.get("/generators/live");

            setGenerator(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    function updateGenerator(data) {

        setGenerator(data);

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-warning">

                <strong>

                    Generator Monitoring

                </strong>

            </div>

            <div className="card-body">

                <GaugeComponent

                    value={generator.fuelLevel}

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

                <table className="table table-striped mt-4">

                    <tbody>

                        <tr>

                            <th>Status</th>

                            <td>{generator.status}</td>

                        </tr>

                        <tr>

                            <th>Output Power</th>

                            <td>{generator.power} kW</td>

                        </tr>

                        <tr>

                            <th>Fuel Level</th>

                            <td>{generator.fuelLevel}%</td>

                        </tr>

                        <tr>

                            <th>Voltage</th>

                            <td>{generator.voltage} V</td>

                        </tr>

                        <tr>

                            <th>Current</th>

                            <td>{generator.current} A</td>

                        </tr>

                        <tr>

                            <th>Frequency</th>

                            <td>{generator.frequency} Hz</td>

                        </tr>

                        <tr>

                            <th>Engine Speed</th>

                            <td>{generator.rpm} RPM</td>

                        </tr>

                        <tr>

                            <th>Oil Pressure</th>

                            <td>{generator.oilPressure} Bar</td>

                        </tr>

                        <tr>

                            <th>Coolant Temp</th>

                            <td>{generator.coolantTemp} °C</td>

                        </tr>

                        <tr>

                            <th>Runtime</th>

                            <td>{generator.runtime} Hours</td>

                        </tr>

                        <tr>

                            <th>Maintenance Due</th>

                            <td>{generator.maintenanceHours} Hours</td>

                        </tr>

                        <tr>

                            <th>Alarm</th>

                            <td>

                                {

                                    generator.alarm ?

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