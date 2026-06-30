import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import api from "../api/axios.js";

import KPI from "../components/cards/KPI.jsx";

import EnergyChart from "../components/charts/EnergyChart.jsx";
import SolarChart from "../components/charts/SolarChart.jsx";
import BatteryChart from "../components/charts/BatteryChart.jsx";
import GeneratorChart from "../components/charts/GeneratorChart.jsx";
import GridChart from "../components/charts/GridChart.jsx";
import FaultChart from "../components/charts/FaultChart.jsx";

export default function Reports(){

    const [summary,setSummary]=useState({});

    useEffect(()=>{

        loadSummary();

    },[]);

    async function loadSummary(){

        const res=

        await api.get("/reports/summary");

        setSummary(res.data);

    }

    function downloadPDF(){

        window.open(

        `${import.meta.env.VITE_API_URL}/reports/export/pdf`,

        "_blank"

        );

    }

    function downloadExcel(){

        window.open(

        `${import.meta.env.VITE_API_URL}/reports/export/excel`,

        "_blank"

        );

    }

    function downloadCSV(){

        window.open(

        `${import.meta.env.VITE_API_URL}/reports/export/csv`,

        "_blank"

        );

    }

    return(

    <DashboardLayout>

    <div className="container-fluid">

    <div className="d-flex justify-content-between mb-4">

    <h2>

    Executive Reporting Center

    </h2>

    <div>

    <button

    className="btn btn-danger me-2"

    onClick={downloadPDF}

    >

    PDF

    </button>

    <button

    className="btn btn-success me-2"

    onClick={downloadExcel}

    >

    Excel

    </button>

    <button

    className="btn btn-primary"

    onClick={downloadCSV}

    >

    CSV

    </button>

    </div>

    </div>

    <div className="row">

    <div className="col-md-3">

    <KPI

    title="Sites"

    value={summary.totalSites}

    />

    </div>

    <div className="col-md-3">

    <KPI

    title="Solar"

    value={`${summary.solarEnergy} kWh`}

    />

    </div>

    <div className="col-md-3">

    <KPI

    title="Battery"

    value={`${summary.batteryHealth}%`}

    />

    </div>

    <div className="col-md-3">

    <KPI

    title="Generator"

    value={`${summary.generatorRuntime} hrs`}

    />

    </div>

    <div className="col-md-3">

    <KPI

    title="Grid Availability"

    value={`${summary.gridAvailability}%`}

    />

    </div>

    <div className="col-md-3">

    <KPI

    title="Renewable"

    value={`${summary.renewableContribution}%`}

    />

    </div>

    <div className="col-md-3">

    <KPI

    title="Diesel Saved"

    value={`${summary.dieselSaved} L`}

    />

    </div>

    <div className="col-md-3">

    <KPI

    title="CO₂ Saved"

    value={`${summary.co2Saved} kg`}

    />

    </div>

    </div>

    <div className="row mt-4">

    <div className="col-lg-6">

    <SolarChart/>

    </div>

    <div className="col-lg-6">

    <BatteryChart/>

    </div>

    </div>

    <div className="row mt-4">

    <div className="col-lg-6">

    <GeneratorChart/>

    </div>

    <div className="col-lg-6">

    <GridChart/>

    </div>

    </div>

    <div className="row mt-4">

    <div className="col-lg-6">

    <EnergyChart/>

    </div>

    <div className="col-lg-6">

    <FaultChart/>

    </div>

    </div>

    </div>

    </DashboardLayout>

    );

}