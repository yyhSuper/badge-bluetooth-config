import axios from 'axios';
import router from '@/router'
import {
  Message
} from 'element-ui'

// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    }).then(res => res.data).catch(error => {
        const msg = error.response.data.msg
        const code = error.response.status
        Message({
          message: msg,
          type: 'error'
        })
    })
};
// 通用公用方法
const req = (method, url, data) => {
  // console.log("发送请求：", url, data);
  return axios({
    method: method,
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'token': localStorage.getItem('logintoken'),
      'uid': localStorage.getItem('uid')
    },
    data: data, // 将 data 直接作为请求体发送
    params: method !== 'post' && method !== 'put' ? data : null, // 非 POST 和 PUT 方法将数据转换为 URL 查询参数
    traditional: true
  }).then(res => res.data).catch(error => {
    const msg = error.response.data.msg;
    const code = error.response.status;
    // if (code === 401) {
    //   localStorage.clear();
    //   window.location.replace('https://be-loved.cn/badge-center/login');
    // }
      //跳转到登录画面
      console.log("请求错误：", error.response)
      if (code === 401) {
        localStorage.clear();
        router.push({
          path: '/login'
        });
      }
    Message({
      message: msg,
      type: 'error'
    });
  });
};


export {
    loginreq,
    req
}
