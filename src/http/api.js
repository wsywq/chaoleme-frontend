import request from './request.js';
export function hello(){
    return request({
        url:'/user/try',
        method:'get'
    })
}
