import axios from 'axios';
let http = axios.create({
    baseURL: 'http://13.230.187.50:8081/wvs', // 请求的公用部分 设置了默认头部地址为： http: //localhost:8080/，这样调用的时候只需写访问方法即可
    withCredentials: true, // 置了跨域， 不需要的话将withCredentials设置为false即可 
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
     transformRequest: [function (data) {
         let newData = '';
         for (let k in data) {
             if (data.hasOwnProperty(k) === true) {
                 newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
             }
         }
         return newData;
     }]
})

// 这里的配置了POST、 GET、 PUT、 DELETE方法。 并且自动将JSON格式数据转为URL拼接的方式
function apiAxios(method, url, params, response) {
    http({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function (res) {
        response(res);
    }).catch(function (err) {
        response(err);
    })
}

export default {
    get: function (url, params, response) {
        return apiAxios('GET', url, params, response)
    },
    post: function (url, params, response) {
        return apiAxios('POST', url, params, response)
    },
    // PUT请求默认会发送两次请求，第一次预检请求不含参数，所以后端不能对PUT请求地址做参数限制
    put: function (url, params, response) {
        return apiAxios('PUT', url, params, response)
    },
    delete: function (url, params, response) {
        return apiAxios('DELETE', url, params, response)
    }
}