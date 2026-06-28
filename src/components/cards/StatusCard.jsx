import PropTypes from "prop-types";

const STATUS_CONFIG = {

    Online: {
        color: "success",
        icon: "bi-wifi"
    },

    Offline: {
        color: "secondary",
        icon: "bi-wifi-off"
    },

    Running: {
        color: "success",
        icon: "bi-play-circle-fill"
    },

    Stopped: {
        color: "secondary",
        icon: "bi-stop-circle-fill"
    },

    Charging: {
        color: "primary",
        icon: "bi-battery-charging"
    },

    Discharging: {
        color: "warning",
        icon: "bi-battery-half"
    },

    Healthy: {
        color: "success",
        icon: "bi-check-circle-fill"
    },

    Warning: {
        color: "warning",
        icon: "bi-exclamation-triangle-fill"
    },

    Fault: {
        color: "danger",
        icon: "bi-x-octagon-fill"
    },

    Maintenance: {
        color: "info",
        icon: "bi-tools"
    },

    Available: {
        color: "success",
        icon: "bi-lightning-charge-fill"
    },

    Outage: {
        color: "danger",
        icon: "bi-lightning-fill"
    }

};

export default function StatusCard({

    title,

    status,

    location,

    updated,

    description

}) {

    const config =
        STATUS_CONFIG[status] ||

        {
            color: "secondary",
            icon: "bi-question-circle-fill"
        };

    return (

        <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h6 className="mb-1">

                            {title}

                        </h6>

                        <small className="text-muted">

                            {location}

                        </small>

                    </div>

                    <div>

                        <i

                            className={`bi ${config.icon} text-${config.color} fs-2`}

                        />

                    </div>

                </div>

                <hr />

                <div className="mb-2">

                    <span

                        className={`badge bg-${config.color}`}

                    >

                        {status}

                    </span>

                </div>

                {description && (

                    <p className="small text-muted mb-2">

                        {description}

                    </p>

                )}

                {updated && (

                    <small className="text-secondary">

                        Updated:

                        {" "}

                        {updated}

                    </small>

                )}

            </div>

        </div>

    );

}

StatusCard.propTypes = {

    title: PropTypes.string.isRequired,

    status: PropTypes.string.isRequired,

    location: PropTypes.string,

    updated: PropTypes.string,

    description: PropTypes.string

};