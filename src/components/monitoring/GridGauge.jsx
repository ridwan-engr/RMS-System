import { useEffect, useState } from "react";

import GaugeComponent from "react-gauge-component";

import api from "../../api/axios";

import socket from "../../api/socket";

export default function GridGauge() {

    const [grid, setGrid] = useState({

        status: "Unavailable",

        voltageL1: 0,

        voltageL2: 0,

        voltageL3: 0,

        currentL1: 0,

        currentL2: 0,

        currentL3: 0,

        frequency: 0,

        powerFactor: 0,

        activePower: 0,

        reactivePower: 0,

        importedEnergy: 0,

        exportedEnergy: 0,

        voltageImbalance: 0,

        frequencyDeviation: 0,

        alarm: false

    });

    useEffect(() => {

        loadGrid();

        socket.connect();

        socket.on("grid:update", updateGrid);

        return () => {

            socket.off("grid:update", updateGrid);

            socket.disconnect();

        };

    }, []);

    async function loadGrid() {

        try {

            const response =

                await api.get("/grid/live");

            setGrid(response.data);

        }

        catch (error) {

            console.error(error);

        }

    }

    function updateGrid(data) {

        setGrid(data);

    }

    return (

        <div className="card shadow">

            <div className="card-header bg-primary text-white">

                <strong>

                    Grid Monitoring

                </strong>

            </div>

            <div className="card-body">

                <GaugeComponent

                    value={grid.frequency}

                    minValue={45}

                    maxValue={55}

                    type="radial"

                    labels={{

                        valueLabel:{

                            formatTextValue:value=>`${value} Hz`

                        }

                    }}

                    arc={{

                        subArcs:[

                            {

                                limit:49,

                                color:"#dc3545"

                            },

                            {

                                limit:51,

                                color:"#28a745"

                            },

                            {

                                limit:55,

                                color:"#dc3545"

                            }

                        ]

                    }}

                />

                <table className="table table-striped mt-4">

                    <tbody>

                        <tr>

                            <th>Status</th>

                            <td>

                                {

                                    grid.status==="Available"

                                    ?

                                    <span className="badge bg-success">

                                        AVAILABLE

                                    </span>

                                    :

                                    <span className="badge bg-danger">

                                        OUTAGE

                                    </span>

                                }

                            </td>

                        </tr>

                        <tr>

                            <th>Voltage L1</th>

                            <td>{grid.voltageL1} V</td>

                        </tr>

                        <tr>

                            <th>Voltage L2</th>

                            <td>{grid.voltageL2} V</td>

                        </tr>

                        <tr>

                            <th>Voltage L3</th>

                            <td>{grid.voltageL3} V</td>

                        </tr>

                        <tr>

                            <th>Current L1</th>

                            <td>{grid.currentL1} A</td>

                        </tr>

                        <tr>

                            <th>Current L2</th>

                            <td>{grid.currentL2} A</td>

                        </tr>

                        <tr>

                            <th>Current L3</th>

                            <td>{grid.currentL3} A</td>

                        </tr>

                        <tr>

                            <th>Power Factor</th>

                            <td>{grid.powerFactor}</td>

                        </tr>

                        <tr>

                            <th>Active Power</th>

                            <td>{grid.activePower} kW</td>

                        </tr>

                        <tr>

                            <th>Reactive Power</th>

                            <td>{grid.reactivePower} kVAr</td>

                        </tr>

                        <tr>

                            <th>Imported Energy</th>

                            <td>{grid.importedEnergy} kWh</td>

                        </tr>

                        <tr>

                            <th>Exported Energy</th>

                            <td>{grid.exportedEnergy} kWh</td>

                        </tr>

                        <tr>

                            <th>Voltage Imbalance</th>

                            <td>{grid.voltageImbalance}%</td>

                        </tr>

                        <tr>

                            <th>Frequency Deviation</th>

                            <td>{grid.frequencyDeviation} Hz</td>

                        </tr>

                        <tr>

                            <th>Alarm</th>

                            <td>

                                {

                                    grid.alarm

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