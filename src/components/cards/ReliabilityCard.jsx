export default function ReliabilityCard({

    analytics

}) {

    return (

        <div className="card shadow-sm">

            <div className="card-header">

                Reliability

            </div>

            <div className="card-body">

                <table className="table">

                    <tbody>

                        <tr>

                            <td>SAIDI</td>

                            <td>

                                {analytics.saidi} min

                            </td>

                        </tr>

                        <tr>

                            <td>SAIFI</td>

                            <td>

                                {analytics.saifi}

                            </td>

                        </tr>

                        <tr>

                            <td>Availability</td>

                            <td>

                                {analytics.availability}%

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );

}