import { useEffect, useState } from "react";

import api from "../../api/axios.js";

import socket from "../../api/socket.js";

export default function SiteStatus() {

    const [sites, setSites] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadSites();

        socket.connect();

        socket.on("site:update", updateSite);

        return () => {

            socket.off("site:update", updateSite);

            socket.disconnect();

        };

    }, []);

    async function loadSites() {

        try {

            const response =

                await api.get("/sites");

            setSites(

                response.data.sites ||

                response.data ||

                []

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    function updateSite(updatedSite) {

        setSites(previous =>

            previous.map(site =>

                site._id === updatedSite._id

                    ? updatedSite

                    : site

            )

        );

    }

    function badge(status) {

        switch(status){

            case "Online":

                return "bg-success";

            case "Warning":

                return "bg-warning";

            case "Offline":

                return "bg-danger";

            default:

                return "bg-secondary";

        }

    }

    if(loading){

        return(

            <div className="card shadow">

                <div className="card-body">

                    Loading Site Status...

                </div>

            </div>

        );

    }

    return(

    <div className="card shadow">

        <div className="card-header bg-success text-white">

            <strong>

                Live Site Status

            </strong>

        </div>

        <div className="card-body">

            <div className="table-responsive">

                <table className="table table-striped table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>Site</th>

                            <th>Status</th>

                            <th>Solar</th>

                            <th>Battery</th>

                            <th>Generator</th>

                            <th>Grid</th>

                            <th>Load</th>

                            <th>Last Update</th>

                        </tr>

                    </thead>

                    <tbody>

                    {

                    sites.map(site=>(

                    <tr key={site._id}>

                        <td>

                            {site.siteName}

                        </td>

                        <td>

                            <span className={`badge ${badge(site.status)}`}>

                                {site.status}

                            </span>

                        </td>

                        <td>

                            {site.solarPower} kW

                        </td>

                        <td>

                            {site.batterySOC} %

                        </td>

                        <td>

                            {site.generatorStatus}

                        </td>

                        <td>

                            {site.gridStatus}

                        </td>

                        <td>

                            {site.loadPower} kW

                        </td>

                        <td>

                            {

                            new Date(

                            site.updatedAt

                            ).toLocaleString()

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