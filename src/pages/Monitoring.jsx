import {
    useEffect,
    useState
} from "react";

import DashboardLayout
from "../layouts/DashboardLayouts.jsx";

import api
from "../api/axios.js";

import { useSocket } from "../context/SocketContext.jsx";

import SiteStatus
from "../components/monitoring/SiteStatus.jsx";

import BatteryGauge
from "../components/monitoring/BatteryGauge.jsx";

import GeneratorGauge
from "../components/monitoring/GeneratorGauge.jsx";

import GridGauge
from "../components/monitoring/GridGauge.jsx";

import PowerFlow
from "../components/monitoring/PowerFlow.jsx";

import AlarmPanel
from "../components/monitoring/AlarmPanel.jsx";

import LiveMap
from "../components/monitoring/LiveMap.jsx";

export default function Monitoring() {

    const socket = useSocket();

    const [

        monitoring,

        setMonitoring

    ] = useState({

        site:{},

        solar:0,

        batterySOC:0,

        batteryPower:0,

        generatorLoad:0,

        generatorPower:0,

        gridAvailability:0,

        gridPower:0,

        loadPower:0,

        alarms:[],

        sites:[]

    });

    useEffect(()=>{

        loadMonitoring();

    },[]);

    async function loadMonitoring(){

        try{

            const [

                site,

                battery,

                generator,

                grid,

                faults

            ] = await Promise.all([

                api.get("/sites"),

                api.get("/batteries"),

                api.get("/generators"),

                api.get("/grid/status"),

                api.get("/faults")

            ]);

            setMonitoring({

                site:

                    site.data.sites?.[0] || {},

                batterySOC:

                    battery.data.batteries?.[0]?.stateOfCharge || 0,

                batteryPower:

                    battery.data.batteries?.[0]?.powerOutput || 0,

                generatorLoad:

                    generator.data.generators?.[0]?.loading || 0,

                generatorPower:

                    generator.data.generators?.[0]?.powerOutput || 0,

                gridAvailability:

                    grid.data.availability || 0,

                gridPower:

                    grid.data.currentPower || 0,

                solar:

                    0,

                loadPower:

                    0,

                alarms:

                    faults.data.faults || [],

                sites:

                    site.data.sites || []

            });

        }

        catch(err){

            console.error(err);

        }

    }

    useEffect(()=>{

        if(!socket) return;

        socket.on(

            "monitoring:update",

            data=>{

                setMonitoring(data);

            }

        );

        return ()=>{

            socket.off(

                "monitoring:update"

            );

        };

    },[socket]);

    return(

        <DashboardLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between mb-4">

                    <div>

                        <h2>

                            Live Hybrid Power Monitoring

                        </h2>

                        <small>

                            Real-Time SCADA Dashboard

                        </small>

                    </div>

                </div>

                {/* Site */}

                <div className="row">

                    <div className="col-lg-4">

                        <SiteStatus

                            site={monitoring.site}

                        />

                    </div>

                    <div className="col-lg-8">

                        <PowerFlow

                            solar={monitoring.solar}

                            battery={monitoring.batteryPower}

                            generator={monitoring.generatorPower}

                            grid={monitoring.gridPower}

                            load={monitoring.loadPower}

                        />

                    </div>

                </div>

                {/* Gauges */}

                <div className="row mt-4">

                    <div className="col-lg-4">

                        <BatteryGauge

                            soc={monitoring.batterySOC}

                        />

                    </div>

                    <div className="col-lg-4">

                        <GeneratorGauge

                            load={monitoring.generatorLoad}

                        />

                    </div>

                    <div className="col-lg-4">

                        <GridGauge

                            availability={monitoring.gridAvailability}

                        />

                    </div>

                </div>

                {/* Alarm + Map */}

                <div className="row mt-4">

                    <div className="col-lg-4">

                        <AlarmPanel

                            alarms={monitoring.alarms}

                        />

                    </div>

                    <div className="col-lg-8">

                        <LiveMap

                            sites={monitoring.sites}

                        />

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}