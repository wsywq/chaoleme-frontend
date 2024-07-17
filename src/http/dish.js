import request from './request.js';

export function getDishList() {
    return request({
        url: '/dish/list',
        method: 'get'
    })
}

export function getDishPage(params) {
    return request({
        url: '/dish/page',
        method: 'get',
        params
    })
}


export function getDishById(param) {
    return request({
        url: '/dish',
        method: 'get',
        param
    })
}

export function addDish(data) {
    return request({
        url: '/dish',
        method: 'post',
        data
    })
}

export function updateDish(params) {
    return request({
        url: '/dish',
        method: 'put',
        data
    })
}
