export default function RenewableMixCard({

    analytics

}) {

    return (

        <div className="card shadow-sm">

            <div className="card-header">

                Renewable Energy Mix

            </div>

            <div className="card-body">

                <h1
                    className="text-success text-center"
                >

                    {analytics.renewableMix}%

                </h1>

                <p
                    className="text-center text-muted"
                >

                    Renewable Penetration

                </p>

            </div>

        </div>

    );

}