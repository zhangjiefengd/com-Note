axios.defaults.baseURL = 'http://localhost:3000';
axios.defualts.timeout = 5000;

axios({

})
axios.interceptors.request.use(
    config => {
        const token = getCookie('session');

        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        if (token) {
            config.params = {'token': token}
        }

        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

axios.interceptors.response.use(
    response => {
        if (response.data.errCode == 2) {
            router.push({
                path: '/',
                query: {redirect: router.currentRote}
            })
        }
        return response;
    }
)

//Get
export function fetch(url, params = {}) {

    return new Promise((resolve, reject) => {

        axios.get(url, {
            params: params
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(data);
        })
    })
}
//Post

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.psot(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

//patch
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(reponse => {
                resolve(response.data);
            }, reject => {
                reject(err);
            })
    })
}

//Put
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {

        axios.put(url, data)
            .then(reponse => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}