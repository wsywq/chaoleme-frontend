import request from './request.js';

export function getTodayWeather(params) {
    console.log(`api param ${JSON.stringify(params)}`);
    return request({
        url: '/weather/today',
        method: 'get',
        params
    })
}
