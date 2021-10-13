import axios from 'axios';

// Axios Handler
export const axiosInstance = axios.create({
    baseURL: "https://socia-api.herokuapp.com/api"
})

// Error Handler
export const errorHandler = (err, defaulted = false) => {
    if (defaulted) {
        return "Ops!, an error occurred.";
    }
    let messageString = "";
    if (!err.response) {
        messageString += "Network error! check your network and try again";
    } else {
        let data = err.response.data.results;
        if (!err.response.data.results) {
            data = err.response.data;
        }
        messageString = loopObj(data);
    }
    return messageString.replace(/{|}|'|\[|\]/g, "");
};

// Loop Object
const loopObj = (obj) => {
    let agg = "";
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            agg += `<div>${key}: ${
                typeof obj[key] === "object" ? loopObj(obj[key]) : obj[key]
            }</div>`;
        }
    }
    return agg;
};