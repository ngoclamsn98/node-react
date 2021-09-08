import axios from "axios";
export const axiosAuth = axios.create()

let refreshTokenRequest: any = null;

const refreshTokenRequestF = (url = '/refresh_token') =>{
    return new Promise<void>(function(resolve, reject) {
        axios
            .post(url, { refreshToken: window.localStorage.getItem("refreshToken")})
            .then(({ data }) => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    });
}

axiosAuth.interceptors.request.use(config=>{
    const token = window.localStorage.getItem("token") || null;
    config.headers.authorization = "Bearer "+ token;
    return config;
})

axiosAuth.interceptors.response.use(response=> {
    return response;
},async error=> {
    const originalRequest = error.config;
    if(error.response.status === 401){
        refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : refreshTokenRequestF();
        const {token, refreshToken} = await refreshTokenRequest;
        refreshTokenRequest = null;
        window.localStorage.setItem('token',token);
        window.localStorage.setItem('refreshToken',refreshToken);
        originalRequest.headers.authorization = 'Bearer ' +token;
        return axios(originalRequest);
    }
    return error;
});