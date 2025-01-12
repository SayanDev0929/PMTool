import axios from "axios";

console.log(
  "localStorage.getItem('tokenNew')",
  localStorage.getItem("tokenNew")
);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    platform: "web",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res?.data,
  (err) => {
    if (err?.response?.status === 401) {
      let responseData = err?.response?.data;
      if (responseData?.message) {
        return responseData;
      }

      let data = {
        success: false,
        status_code: 401,
        message: "Your Session is expired! Please Re-login",
        data: err.response.data,
      };

      return data;
    }
    if (err?.response?.status === 422) {
      console.log("422 Error", JSON.stringify(err?.response?.data));
      let data = {
        success: false,
        status_code: 422,
        message: "Something went wrong",
        data: err.response.data,
      };
      return data;
    }
    if (err?.response?.status === 500) {
      console.log("500 Error", JSON.stringify(err?.response?.data));
      let data = {
        success: false,
        status_code: 500,
        message: "Something went wrong",
        data: err.response.data,
      };
      return data;
    }
    if (err?.response?.status === 502) {
      console.log("502 Error", JSON.stringify(err?.response?.data));
      let data = {
        success: false,
        status_code: 200,
        message: "Something went wrong",
        data: err.response.data,
      };
      return data;
    }

    if (err?.response?.status === 400) {
      console.log("500 Error", JSON.stringify(err?.response?.data));
      let data = {
        status: "error",
        status_code: 200,
        message: "Something went wrong",
        ...err?.response?.data,
      };
      return data;
    }

    return Promise.reject(err);
  }
);

export { axiosInstance };
