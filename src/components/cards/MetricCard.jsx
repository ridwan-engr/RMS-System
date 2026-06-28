import PropTypes from "prop-types";

export default function MetricCard({

    title,

    value,

    unit = "",

    icon = "bi-speedometer2",

    color = "primary",

    min,

    max,

    precision = 2,

    updated,

    healthy = true

}) {

    const numericValue =
        Number(value);

    const progress =
        max
            ? Math.min(
                  (numericValue / max) * 100,
                  100
              )
            : 0;

    return (

        <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

                <div className="d-flex justify-content-between">

                    <div>

                        <small className="text-muted">

                            {title}

                        </small>

                        <h3 className="fw-bold mt-2">

                            {Number.isNaN(numericValue)

                                ? value

                                : numericValue.toFixed(
                                      precision
                                  )}

                            <span className="fs-6 ms-1">

                                {unit}

                            </span>

                        </h3>

                    </div>

                    <div>

                        <i

                            className={`bi ${icon} fs-1 text-${color}`}

                        />

                    </div>

                </div>

                {

                max &&

                <>

                <div className="progress mt-3">

                    <div

                    className={`progress-bar bg-${color}`}

                    style={{

                        width:`${progress}%`

                    }}

                    />

                </div>

                <div className="d-flex justify-content-between small mt-1">

                    <span>

                    Min:

                    {min}

                    </span>

                    <span>

                    Max:

                    {max}

                    </span>

                </div>

                </>

                }

                <hr/>

                <div className="d-flex justify-content-between align-items-center">

                    <small className="text-secondary">

                        Updated

                        <br/>

                        {updated || "Live"}

                    </small>

                    <span

                    className={`badge bg-${
                    healthy
                    ?"success"
                    :"danger"
                    }`}

                    >

                    {

                    healthy

                    ?"Healthy"

                    :"Abnormal"

                    }

                    </span>

                </div>

            </div>

        </div>

    );

}

MetricCard.propTypes = {

    title:PropTypes.string.isRequired,

    value:PropTypes.oneOfType([

        PropTypes.string,

        PropTypes.number

    ]).isRequired,

    unit:PropTypes.string,

    icon:PropTypes.string,

    color:PropTypes.string,

    min:PropTypes.number,

    max:PropTypes.number,

    precision:PropTypes.number,

    updated:PropTypes.string,

    healthy:PropTypes.bool

};