import axios from "axios";

// Axios Instance
const api = axios.create({
    baseURL:
        import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type":
            "application/json"
    },
    timeout: 30000
});

//Request Interceptor

api.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem("token");
        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);


// Response Interceptor

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.warn(
                        "Unauthorized. Logging out..."
                    );

                    localStorage.removeItem("token");
                    window.location.href = "/";
                    break;
                case 403:
                    console.warn(
                        "Access Forbidden."
                    );

                    break;
                case 404:

                    console.warn(
                        "Resource not found."
                    );

                    break;
                case 500:

                    console.error(
                        "Internal Server Error."
                    );
                    break;
                default:
                    console.error(
                        error.response.data
                    );

            }

        }

        return Promise.reject(error);

    }

);

export default api;