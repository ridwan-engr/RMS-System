import {
    useState,
    useEffect,
    useCallback
}
from "react";

import {

    getAnalytics

}
from "../services/analyticsService.js";

export default function useAnalytics() {

    const [analytics, setAnalytics] =
        useState({

            /*
            |--------------------------------------------------------------------------
            | KPI Metrics
            |--------------------------------------------------------------------------
            */

            saidi: 0,
            saifi: 0,
            ens: 0,
            lolp: 0,

            resilience: 0,
            recovery: 0,

            renewableMix: 0,

            availability: 0,

            criticalLoad: 0,

            /*
            |--------------------------------------------------------------------------
            | Charts
            |--------------------------------------------------------------------------
            */

            solarTrend: [],

            batteryTrend: [],

            generatorTrend: [],

            gridTrend: [],

            energyTrend: [],

            forecastTrend: [],

            faultTrend: []

        });

    const [loading,
        setLoading] =
        useState(true);

    const [error,
        setError] =
        useState(null);

    /*
    |--------------------------------------------------------------------------
    | Load Analytics
    |--------------------------------------------------------------------------
    */

    const refreshAnalytics =
        useCallback(

            async () => {

                try {

                    setLoading(true);

                    setError(null);

                    const response =
                        await getAnalytics();

                    /*
                    --------------------------------------------------------------
                    Backend should return:

                    {
                        success:true,
                        analytics:{...}
                    }

                    or

                    {
                        success:true,
                        saidi:...
                    }

                    --------------------------------------------------------------
                    */

                    if (
                        response.analytics
                    ) {

                        setAnalytics(
                            response.analytics
                        );

                    }

                    else {

                        setAnalytics(
                            response
                        );

                    }

                }

                catch (err) {

                    console.error(err);

                    setError(

                        err.response?.data?.message ||

                        err.message ||

                        "Unable to load analytics."

                    );

                }

                finally {

                    setLoading(false);

                }

            },

            []

        );

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        refreshAnalytics();

    }, [refreshAnalytics]);

    /*
    |--------------------------------------------------------------------------
    | Auto Refresh Every 5 Seconds
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const timer =

            setInterval(() => {

                refreshAnalytics();

            }, 5000);

        return () =>

            clearInterval(timer);

    }, [refreshAnalytics]);

    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {

        analytics,

        loading,

        error,

        refreshAnalytics

    };

}