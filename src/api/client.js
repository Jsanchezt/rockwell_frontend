import axios from 'axios'
import config from "@/config/index";
import Auth from "@/api/auth";


let isRefreshing = false;
let subscribers = [];

const subscribeTokenRefresh = (cb)=>{
    subscribers.push(cb);
};

const onRefreshToken = (token)=>{
    subscribers = subscribers.filter(cb => cb(token))
};

const axiosInstance  = axios.create({
    baseURL: config.URL_API,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

axiosInstance.interceptors.request.use(function (config) {
    config.headers = {...config.headers,
        'Authorization':`Bearer ${localStorage.getItem('at')}`
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        if (error.response.status === 401){
            if(!isRefreshing){
                //Refresh token
                isRefreshing = true;
                let auth =  new Auth();
                auth.refresh_token(localStorage.getItem('rt')).then(data=>{
                    isRefreshing = false;
                    localStorage.setItem('at',data.access_token)
                    localStorage.setItem('rt',data.refresh_token)
                    onRefreshToken(data.access_token);
                }).catch(error => {
                    window.location.reload()
                })
            }

            return new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    resolve(axiosInstance(originalRequest));
                });
            });
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
