import request from './request.js';

export function submitDishList(data) {
    return request({
        url: '/order/submit',
        method: 'post',
        data
    })
}

export function getTodayOrder() {
    return request({
        url: '/order/today',
        method: 'get'
    })
}
