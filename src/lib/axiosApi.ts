import Cache from "@/util/cache";
import axios from "axios";


const axiosApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ROOT_URL}`,
});


// Request interceptor
axiosApi.interceptors.request.use(
  (config) => {

    const accessToken = Cache.getCookie("token");

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    console.log("requesterror:", error)
    window.alert("Something went wrong")

    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
axiosApi.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response;
  },
  (error) => {
    // Handle response errors here
    console.log("responseerror:", error)
    if (error?.response?.status === 403 || error?.response?.status === 401) {

      console.log(error?.response?.data?.message, error?.response?.status);
      window.location.href = "/sign-in"
      window.alert("Token Expires")

    } else {
      return Promise.reject(error);
    }

  }
);


export default axiosApi;

