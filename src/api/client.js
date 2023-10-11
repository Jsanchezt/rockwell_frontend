import axios from 'axios'


let isRefreshing = false;
let subscribers = [];

const subscribeTokenRefresh = (cb)=>{
    subscribers.push(cb);
};

const onRefreshToken = (token)=>{
    subscribers = subscribers.filter(cb => cb(token))
};

const axiosInstance  = axios.create({
    baseURL: 'http://localhost/api',
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
                // pkce.refreshToken().then((data)=>{
                //     try{
                //         Echo.options.auth.headers['Authorization'] = `Bearer ${data.access_token}`;
                //     }catch(e){
                //
                //     }
                //     isRefreshing = false;
                //     onRefreshToken(data.access_token);
                // }).catch(error => {
                //     //logout process
                // });
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
