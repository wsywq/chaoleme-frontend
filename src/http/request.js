import axios from 'axios';

const service = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    baseURL:window.location.host,
    timeout:5000
});

// service.interceptors.request.use(
//     config =>{
//
//     }
// )

service.interceptors.response.use(
    response=>{
        if (response.status === 200 && response.data.code === 200) {
            return Promise.resolve(response.data.data);
        } else {
            return Promise.reject(response.data);
        }
    },
    error => {
        console.log("Response error"+JSON.stringify(error));
        return Promise.reject(error);
    }
);

export default service;


