import request from './request.js';

export function getCategoryList() {
    return request({
        url: '/category/list',
        method: 'get'
    })
}
