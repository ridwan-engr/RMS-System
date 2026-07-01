import api from "../api/axios.js";


export async function getSites() {

    const response =
        await api.get(
            "/sites"
        );

    return response.data;

}


export async function getbattery() {

    const response =
        await api.get(
            "/battery"
        );

    return response.data;

}

export async function getgenerator() {

    const response =
        await api.get(
            "/generator"
        );

    return response.data;

}

// Get Complete Analytics Dashboard

export async function getAnalytics() {

    const response =
        await api.get(
            "/analytics"
        );

    return response.data;

}

// Get Reliability Metrics

export async function getReliability() {

    const response =
        await api.get(
            "/analytics/reliability"
        );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Resilience Metrics
|--------------------------------------------------------------------------
*/

export async function getResilience() {

    const response =
        await api.get(
            "/analytics/resilience"
        );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get SAIDI
|--------------------------------------------------------------------------
*/

export async function getSAIDI() {

    const response =
        await api.get(
            "/analytics/saidi"
        );

    return response.data;

}

// Get SAIFI

export async function getSAIFI() {

    const response =
        await api.get(
            "/analytics/saifi"
        );

    return response.data;

}

// Get ENS
export async function getENS() {

    const response =
        await api.get(
            "/analytics/ens"
        );

    return response.data;

}

// Get LOLP

export async function getLOLP() {

    const response =
        await api.get(
            "/analytics/lolp"
        );

    return response.data;

}

// Get Solar Trend

export async function getSolarTrend() {

    const response =
        await api.get(
            "/analytics/solar"
        );

    return response.data;

}

// Get Battery Trend

export async function getBatteryTrend() {

    const response =
        await api.get(
            "/analytics/battery"
        );

    return response.data;

}

// Get Generator Trend

export async function getGeneratorTrend() {

    const response =
        await api.get(
            "/analytics/generator"
        );

    return response.data;

}

// Get Grid Trend

export async function getGridTrend() {

    const response =
        await api.get(
            "/analytics/grid"
        );

    return response.data;

}

// Get Energy Trend

export async function getEnergyTrend() {

    const response =
        await api.get(
            "/analytics/energy"
        );

    return response.data;

}

// Get Forecast Trend

export async function getForecastTrend() {

    const response =
        await api.get(
            "/analytics/forecast"
        );

    return response.data;

}


// Fault Trend

export async function getFaultTrend() {

    const response =
        await api.get(
            "/analytics/faults"
        );

    return response.data;

}

// Renewable Energy Mix

export async function getEnergyMix() {

    const response =
        await api.get(
            "/analytics/energy-mix"
        );

    return response.data;

}

// Critical Load

export async function getCriticalLoad() {

    const response =
        await api.get(
            "/analytics/critical-load"
        );

    return response.data;

}