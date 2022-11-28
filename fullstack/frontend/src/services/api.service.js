import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: sessionStorage.getItem('token'),
    }, 
};

export default (baseURL) => {
    return axios.create({
        baseURL,
        withCredentials: true,
        
        ...commonConfig,
    });
};