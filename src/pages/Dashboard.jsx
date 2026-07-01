import { useEffect, useState } from "react";
import DashboardLayouts from "../layouts/DashboardLayout.jsx";
import api from "../api/axios.js";

import KPI from "../components/cards/KPI.jsx";

import EnergyChart from "../components/charts/EnergyChart.jsx";
import ForecastChart from "../components/charts/ForecastChart.jsx";

//import FaultTable from "../components/tables/FaultTable";

export default function Dashboard() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({

        totalSites: 0,

        solarPlants: 0,

        batteries: 0,

        generators: 0,

        activeFaults: 0,

        gridAvailability: 0,

        saidi: 0,

        saifi: 0,

        ens: 0,

        lolp: 0,

        resilience: 0,

        energyRecords: [],

        forecasts: [],

        faults: []

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const [

                sites,

                solar,

                battery,

                generator,

                faults,

                analytics,

                grid,

                energy,

                forecast,

                auth,

                reports

            ] = await Promise.all([

                api.get("/sites"),

                api.get("/solar"),

                api.get("/battery"),

                api.get("/generator"),

                api.get("/faults"),

                api.get("/analytics"),

                api.get("/grid"),

                api.get("/energy"),

                api.get("/forecast"),

                api.get("/auth/login"),

                api.get ("/reports")

            ]);

            setDashboard({

                totalSites:

                    sites.data.sites?.length || 0,

                solarPlants:

                    solar.data.solar?.length || 0,

                batteries:

                    battery.data.batteries?.length || 0,

                generators:

                    generator.data.generators?.length || 0,

                activeFaults:

                    faults.data.faults?.filter(

                        f => f.status !== "resolved"

                    ).length || 0,

                gridAvailability:

                    Number(grid.data.availability || 0),

                saidi:

                    analytics.data.analytics?.saidi || 0,

                saifi:

                    analytics.data.analytics?.saifi || 0,

                ens:

                    analytics.data.analytics?.ens || 0,

                lolp:

                    analytics.data.analytics?.lolp || 0,

                resilience:

                    analytics.data.analytics?.resilience || 0,

                energyRecords:

                    energy.data.records || [],

                forecasts:

                    forecast.data.forecasts || [],

                faults:

                    faults.data.faults || []

            });

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

            <DashboardLayout>

                <div className="text-center mt-5">

                    <div className="spinner-border text-primary"/>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="container-fluid">

                <div className="mb-4">

                    <h2>

                        Hybrid Energy Management Dashboard

                    </h2>

                    <small>

                        Real-Time Engineering Monitoring Platform

                    </small>

                </div>

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <KPI

                            title="Sites"

                            value={dashboard.totalSites}

                            color="primary"

                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <KPI

                            title="Solar Plants"

                            value={dashboard.solarPlants}

                            color="success"

                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <KPI

                            title="Battery Banks"

                            value={dashboard.batteries}

                            color="warning"

                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <KPI

                            title="Generators"

                            value={dashboard.generators}

                            color="secondary"

                        />

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-3 mb-3">

                        <KPI

                            title="Grid Availability"

                            value={`${dashboard.gridAvailability}%`}

                            color="info"

                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <KPI

                            title="SAIDI"

                            value={dashboard.saidi}

                            color="danger"

                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <KPI

                            title="SAIFI"

                            value={dashboard.saifi}

                            color="dark"

                        />

                    </div>

                    <div className="col-md-3 mb-3">

                        <KPI

                            title="Active Faults"

                            value={dashboard.activeFaults}

                            color="danger"

                        />

                    </div>

                </div>

                <div className="row">

                    <div className="col-lg-6">

                        <EnergyChart

                            records={dashboard.energyRecords}

                        />

                    </div>

                    <div className="col-lg-6">

                        <ForecastChart

                            forecasts={dashboard.forecasts}

                        />

                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-lg-4">

                        <KPI

                            title="ENS (kWh)"

                            value={dashboard.ens}

                            color="warning"

                        />

                    </div>

                    <div className="col-lg-4">

                        <KPI

                            title="LOLP"

                            value={dashboard.lolp}

                            color="secondary"

                        />

                    </div>

                    <div className="col-lg-4">

                        <KPI

                            title="Resilience (%)"

                            value={dashboard.resilience}

                            color="success"

                        />

                    </div>

                </div>

                <div className="mt-4">

                    <FaultTable

                        faults={dashboard.faults}

                    />

                </div>

            </div>

        </DashboardLayout>

    );

}