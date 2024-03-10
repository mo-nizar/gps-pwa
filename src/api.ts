"use client";
import axios from "axios";
import { ENVS } from "./constants";

const instance = axios.create({
  baseURL: ENVS.API_BASE_URL,
  headers: {
    DEVICE: "web",
    "API-VERSION": "0.0.1",
    "APP-VERSION": "0.0.1",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const {
      method,
      url,
      params,
      headers: { jwt_token, security_token, user_id },
    } = config;

    const req_timestamp = Date.now();

    // Modify the logic to include parameters in the request body for specific methods
    if (method === "post" || method === "put" || method === "patch") {
      // Assuming you want to include parameters in the body for POST, PUT, and PATCH requests
      config.data = params;      
    } else {
      // For other methods like GET, include parameters in the URL
      config.params = params;
    }

    // Adjust the logic as needed for your requirements
    // const req_hash = CryptoJS.enc.Hex.stringify(
    //   CryptoJS.SHA512(req_timestamp + Config.REQUEST_TOKEN_KEY),
    // );

    // if (jwt_token) {
    //   config.headers['AUTH-TOKEN'] = `${jwt_token}:${req_hash}`;
    // }

    // Include necessary headers
    config.headers["REQUEST-TIMESTAMP"] = req_timestamp;
    config.headers["SECURITY-TOKEN"] =
      security_token || "default_security_token";
    config.headers["USER-ID"] = user_id || "default_user_id";
    config.headers["DEVICE-ID"] = "default_device_id";

    return config;
  },
  (err) => {
    // Handle request error
    return Promise.reject(err);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (err) => {
    // Handle response error
    return Promise.reject(err);
  }
);

export default instance;
