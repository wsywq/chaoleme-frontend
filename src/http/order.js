import request from './request.js';

export function submitDishList(data) {
    return request({
        url:'/order/submit',
        method: 'post',
        data
    })
}
