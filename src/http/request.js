import axios from 'axios';

const request = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    // baseURL:window.location.host,
    baseURL:"http://106.54.32.95:8080",
    timeout:5000
});

// request.interceptors.request.use(
//     config =>{
//
//     }
// )

request.interceptors.response.use(
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

export default request;


