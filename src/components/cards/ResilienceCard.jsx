export default function ResilienceCard({

    analytics

}) {

    return (

        <div className="card shadow-sm">

            <div className="card-header">

                System Resilience

            </div>

            <div className="card-body">

                <table className="table">

                    <tbody>

                        <tr>

                            <td>Recovery</td>

                            <td>

                                {analytics.recovery}%

                            </td>

                        </tr>

                        <tr>

                            <td>Resilience</td>

                            <td>

                                {analytics.resilience}%

                            </td>

                        </tr>

                        <tr>

                            <td>Critical Load</td>

                            <td>

                                {analytics.criticalLoad}%

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}