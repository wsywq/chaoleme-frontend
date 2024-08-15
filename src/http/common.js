import request from './request.js';

export function uploadFile(data) {
    return request({
        headers: {
            'Content-type': 'multipart/form-data'
        },
        url: '/common/upload',
        method: 'post',
        data
    })
}
