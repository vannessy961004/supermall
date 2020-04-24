import axios from 'axios'

export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
      baseURL:'http://152.136.185.210:8000/api/h8',
      timeout:5000
    })

   //interceptors.response 拦截响应
   instance.interceptors.response.use(res => {
     return res.data
   },err => {
     console.log(err)
   })


    // 3.发送真正的网络请求
    return instance(config)
}
