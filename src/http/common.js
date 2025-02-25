import request from './request.js';

export function uploadImageFile(data) {
    return request({
        headers: {
            'Content-type': 'multipart/form-data'
        },
        url: '/common/upload',
        method: 'post',
        data
    })
}

export function uploadExcel(data) {
    return request({
        headers: {
            'Content-type': 'multipart/form-data'
        },
        url: '/common/uploadExcel',
        method: 'post',
        data
    })
}
