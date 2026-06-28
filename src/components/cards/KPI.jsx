import PropTypes from "prop-types";

export default function KPI({

    title,

    value,

    unit = "",

    icon = "bi-speedometer2",

    color = "primary",

    trend,

    subtitle

}) {

    return (

        <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <small className="text-muted">

                            {title}

                        </small>

                        <h3 className="fw-bold mt-2 mb-1">

                            {value}

                            {unit && (

                                <span className="fs-6 ms-1">

                                    {unit}

                                </span>

                            )}

                        </h3>

                        {subtitle && (

                            <small className="text-secondary">

                                {subtitle}

                            </small>

                        )}

                    </div>

                    <div>

                        <div

                            className={`rounded-circle bg-${color} text-white d-flex align-items-center justify-content-center`}

                            style={{

                                width: 60,

                                height: 60

                            }}

                        >

                            <i

                                className={`bi ${icon} fs-3`}

                            />

                        </div>

                    </div>

                </div>

                {trend && (

                    <div className="mt-3">

                        <span

                            className={`badge bg-${trend > 0 ? "success" : trend < 0 ? "danger" : "secondary"}`}

                        >

                            {trend > 0 ? "▲" : trend < 0 ? "▼" : "■"}

                            {" "}

                            {Math.abs(trend)}%

                        </span>

                    </div>

                )}

            </div>

        </div>

    );

}

KPI.propTypes = {

    title: PropTypes.string.isRequired,

    value: PropTypes.oneOfType([

        PropTypes.string,

        PropTypes.number

    ]).isRequired,

    unit: PropTypes.string,

    icon: PropTypes.string,

    color: PropTypes.string,

    trend: PropTypes.number,

    subtitle: PropTypes.string

};