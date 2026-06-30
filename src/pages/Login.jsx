import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await api.post(

                "/auth/login",

                form

            );

            login(

                response.data.user,

                response.data.token

            );

            navigate("/dashboard");

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                "Invalid email or password."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="container-fluid vh-100"
            style={{
                background: "#0d1b2a"
            }}
        >

            <div className="row h-100">

                <div
                    className="col-lg-7 d-flex align-items-center justify-content-center"
                    style={{
                        color: "white"
                    }}
                >

                    <div>

                        <h1 className="display-4">

                            RMS

                        </h1>

                        <h3>

                            Hybrid Energy Management

                        </h3>

                        <h3>

                            &

                        </h3>

                        <h3>

                            Analytics Platform

                        </h3>

                        <hr />

                        <p>

                            Engineering Dashboard

                        </p>

                        <p>

                            Renewable Energy Monitoring

                        </p>

                        <p>

                            Battery Analytics

                        </p>

                        <p>

                            SCADA Monitoring

                        </p>

                        <p>

                            Reliability Engineering

                        </p>

                    </div>

                </div>

                <div
                    className="col-lg-5 d-flex align-items-center justify-content-center"
                >

                    <div
                        className="card shadow-lg"
                        style={{
                            width: "420px"
                        }}
                    >

                        <div className="card-body">

                            <h3
                                className="text-center mb-4"
                            >

                                Engineer Login

                            </h3>

                            {

                                error && (

                                    <div
                                        className="alert alert-danger"
                                    >

                                        {error}

                                    </div>

                                )

                            }

                            <form
                                onSubmit={handleSubmit}
                            >

                                <div className="mb-3">

                                    <label>

                                        Email

                                    </label>

                                    <input

                                        className="form-control"

                                        type="email"

                                        name="email"

                                        value={form.email}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-4">

                                    <label>

                                        Password

                                    </label>

                                    <input

                                        className="form-control"

                                        type="password"

                                        name="password"

                                        value={form.password}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <button

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {

                                        loading ?

                                            "Signing In..." :

                                            "Login"

                                    }

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}