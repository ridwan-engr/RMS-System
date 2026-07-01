import { useEffect } from "react";

import DashboardLayouts
from "../layouts/DashboardLayout.jsx";

import useAnalytics
from "../hooks/useAnalytics.js";

import KPI
from "../components/cards/KPI.jsx";

import ReliabilityCard
from "../components/cards/ReliabilityCard.jsx";

import ResilienceCard
from "../components/cards/ResilienceCard.jsx";

import RenewableMixCard
from "../components/cards/RenewableMixCard.jsx";

import SolarChart
from "../components/charts/SolarChart.jsx";

import BatteryChart
from "../components/charts/BatteryChart.jsx";

import EnergyChart
from "../components/charts/EnergyChart.jsx";

import GeneratorChart
from "../components/charts/GeneratorChart.jsx";

import GridChart
from "../components/charts/GridChart.jsx";

import ForecastChart
from "../components/charts/ForecastChart.jsx";

import FaultChart
from "../components/charts/FaultChart.jsx";

import SAIDIChart
from "../components/charts/SAIDIChart.jsx";

import SAIFIChart
from "../components/charts/SAIFIChart.jsx";

import ENSChart
from "../components/charts/ENSChart.jsx";

import LOLPChart
from "../components/charts/LOLPChart.jsx";

export default function Analytics() {

    const {

        analytics,

        loading,

        error,

        refreshAnalytics

    } = useAnalytics();

    useEffect(() => {

        refreshAnalytics();

    }, []);

    if (loading) {

        return (

            <DashboardLayout>

                <div className="text-center mt-5">

                    <div
                        className="spinner-border text-primary"
                    />

                    <p className="mt-3">

                        Loading Analytics...

                    </p>

                </div>

            </DashboardLayout>

        );

    }

    if (error) {

        return (

            <DashboardLayout>

                <div
                    className="alert alert-danger"
                >

                    {error}

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="container-fluid">

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                >

                    <div>

                        <h2>

                            Engineering Analytics

                        </h2>

                        <small className="text-muted">

                            Hybrid Energy Performance Dashboard

                        </small>

                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={refreshAnalytics}
                    >

                        Refresh

                    </button>

                </div>

                {/* ===================== KPI ===================== */}

                <div className="row g-3">

                    <div className="col-lg-3">

                        <KPI
                            title="SAIDI"
                            value={analytics.saidi}
                            unit="min"
                            color="danger"
                        />

                    </div>

                    <div className="col-lg-3">

                        <KPI
                            title="SAIFI"
                            value={analytics.saifi}
                            unit=""
                            color="warning"
                        />

                    </div>

                    <div className="col-lg-3">

                        <KPI
                            title="ENS"
                            value={analytics.ens}
                            unit="kWh"
                            color="success"
                        />

                    </div>

                    <div className="col-lg-3">

                        <KPI
                            title="LOLP"
                            value={analytics.lolp}
                            unit="%"
                            color="primary"
                        />

                    </div>

                </div>

                <div className="row g-3 mt-2">

                    <div className="col-lg-4">

                        <ReliabilityCard
                            analytics={analytics}
                        />

                    </div>

                    <div className="col-lg-4">

                        <ResilienceCard
                            analytics={analytics}
                        />

                    </div>

                    <div className="col-lg-4">

                        <RenewableMixCard
                            analytics={analytics}
                        />

                    </div>

                </div>

                {/* ===================== CHARTS ===================== */}

                <div className="row mt-4">

                    <div className="col-lg-6">

                        <SolarChart
                            data={analytics.solarTrend}
                        />

                    </div>

                    <div className="col-lg-6">

                        <BatteryChart
                            data={analytics.batteryTrend}
                        />

                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-lg-6">

                        <EnergyChart
                            data={analytics.energyTrend}
                        />

                    </div>

                    <div className="col-lg-6">

                        <GeneratorChart
                            data={analytics.generatorTrend}
                        />

                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-lg-6">

                        <GridChart
                            data={analytics.gridTrend}
                        />

                    </div>

                    <div className="col-lg-6">

                        <ForecastChart
                            data={analytics.forecastTrend}
                        />

                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-lg-6">

                        <FaultChart
                            data={analytics.faultTrend}
                        />

                    </div>

                    <div className="col-lg-6">

                        <LOLPChart
                            value={analytics.lolp}
                        />

                    </div>

                </div>

                <div className="row mt-4">

                    <div className="col-lg-4">

                        <SAIDIChart
                            value={analytics.saidi}
                        />

                    </div>

                    <div className="col-lg-4">

                        <SAIFIChart
                            value={analytics.saifi}
                        />

                    </div>

                    <div className="col-lg-4">

                        <ENSChart
                            value={analytics.ens}
                        />

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}