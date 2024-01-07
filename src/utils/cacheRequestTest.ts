/**
 * refreshToken 刷新 AccessToken + 重发请求缓存队列 的最小模拟 Demo
 */

// 请求缓存队列
let requestQueue = [];

// Access token
let token = '';

// 网络请求
function request(config) {
    config.token = token;
    console.log('request param config', config)

    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ status: 200 });
        }, 3000);
    })
}

// 缓存请求操作
function cacheRequest(config) {
    console.log('cacheRequest param config', config)
    console.log('cacheRequest init');
    return new Promise((resolve) => {
        console.log('cacheRequest Promise');
        requestQueue.push(
            // 缓存回调函数(闭包)
            (param) => {
                console.log('requestQueue Item callback param', param); // 展示使用闭包回调函数传参的效果
                resolve(request(config))
            }
        );
    })
}

// 刷新 Access Token
function refreshToken() {
    console.log('refreshToken init');
    // 模拟获取 token 成功
    token = 'token';

    // 使用回调函数(闭包)
    requestQueue.map(callback => {
        callback();
    })
    requestQueue.splice(0);
}

// 模拟
function start() {
    let config = { headers: {} };
    // 手动缓存请求列表一次
    cacheRequest(config);
    // 刷新 access token + 重试操作
    refreshToken();
}

start();
// output:
// cacheRequest param config { headers: {} }
// cacheRequest init
// cacheRequest Promise
// refreshToken init
// requestQueue Item callback param undefined
// request param config { headers: {}, token: 'token' }