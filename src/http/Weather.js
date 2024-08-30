import request from './request.js';

export function getTodayWeather(params) {
    return request({
        url: '/weather/today',
        method: 'get',
        params: params
    })
}
