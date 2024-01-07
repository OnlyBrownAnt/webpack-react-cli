/**
 * 网络请求流程分为两层
 * 1. 请求公共拦截层 axios
 * 2. 请求业务调用层 use function request
 * 可以在这两层中进行请求参数响应结果捕获和拦截处理
 * 
 * 正常结果处理流程
 * - 包装业务状态结果，按流程依次返回到请求业务调用层。
 * 异常结果处理流程
 * - 公共性异常，包装的业务状态结果作为异常内容，并主动抛出异常。让局部、全局异常拦截事件进行拦截处理。
 * - 业务性异常，补充功能选项参数处理该异常是否需要被拦截抛到请求业务调用层，返回包装的业务状态结果，否则直接主动抛出异常。让局部、全局异常拦截事件进行拦截处理。
 * 
 * TODO 通常不建议调用接口的时候进行 catch 处理，因为有方式定义需要的返回的业务结果，会进行包装返回。如果非要在请求业务调用层进行 catch，那么在处理方式最后要主动进行抛出不需要捕获的异常。让全局异常处理器能够接收。 
 */

import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

export interface RequestConfig extends InternalAxiosRequestConfig {
  headers: AxiosHeaders & RequestHeaders | any, // TODO 这个类型存在必选问题
  options?: Options
}

/**
 * 补充 Header 参数
 */
export type RequestHeaders = {
  token?: string // Token
  retryRequestCount: number // 重试请求次数
}

/* 
 * 补充功能选项类型
 */
export type Options = {
  isEncrypt?: boolean, // 是否需要加解密处理
  isLogin?: boolean, // 是否需要登录状态检查
  isLoading?: boolean, // 是否需要启用加载弹窗
  isCatchAllErrorCode?: boolean, // 是否拦截当前 API 所有的错误码，并抛出到请求业务调用层。
  catchErrorCodeSet?: Set<string | number> // 是否拦截当前 API 在 Set 集合存在的错误码，并抛出到请求业务调用层。(isThrowCatchAllError = false时生效) 
}

const defaultOptions: Options = {
  isEncrypt: false,
  isLogin: false,
  isLoading: true,
  isCatchAllErrorCode: false,
  catchErrorCodeSet: new Set([])
}

/**
 * 请求状态结果类型
 */
export type RequestResult = {
  api: string | undefined, // 相关 API 
  code?: string | number, // 业务码
  message?: string // 描述信息
  data?: Object // 响应数据
}

/**
 * 公共类型网络异常枚举
 */
export enum CommonRequestErrorEnum {
  RESPONSE_BACK_ERROR = '10001_请求已经成功发起，但没有收到响应',
  REQUEST_SENT_ERROR =  '10002_发送请求时出了点问题',
  ERROR_UNHANDLED = '10003_异常响应无捕获处理',
  LOGIN_INVALID = '10004_登陆失效',
  ACCESSTOKEN_INVALID = '10005_AccessToken失效',
  REFRRSHTOKEN_INVALID = '10006_refreshToken失效'
}

/**
 * create axios instance 
 */
export const requestInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }
})

/**
 * 请求公共拦截层
 * request interceptor 
 */
requestInstance.interceptors.request.use(
  config => {
    const configTemp = config as RequestConfig;
    configTemp.options = Object.assign(defaultOptions, configTemp.options);
    configTemp.headers.token = getAccessToken(); 

    return configTemp;
  },
  error => {
    const requestResult: RequestResult = {
      api: error.request.url,
      code: error.request.status,
      message: error.request.statusText
    }
    return Promise.reject(requestResult);
  }
)

/**
 * 请求公共拦截层 
 * 默认后端是将异常进行包装后返回。
 * response interceptor
 */
requestInstance.interceptors.response.use(
  response => {
    const requestResult: RequestResult = {
      api: response.request.url,
      code: response.status,
      message: response.statusText,
      data: response.data
    }

    if (requestResult.code === 200) {
      return Promise.resolve(requestResult as any); // 断言 强制跳过 TS 校验
    } else {
      // TODO 业务异常情况 需要和后端确认字段，处理业务异常码和数据
      // requestResult.code = response.data.status;

      if (response.headers.options?.isCatchAllErrorCode === true) {
        // 拦截处理
      } else if (response.headers.options?.catchErrorCodeSet?.has(requestResult.code)) {
        // 拦截处理
      } else {
        if (requestResult.code === 10004) {
          // TODO 登陆失效处理
          requestResult.message = CommonRequestErrorEnum.LOGIN_INVALID; 
        } else if (requestResult.code === 401) {
          // TODO 刷新 Access Token 和 重试请求队列
          if (refreshTokenLock) {
            refreshTokenLock = false;
            refreshToken().then(res => {
              const token = res.data.token;
              setAccessToken(token);

              // 重试请求队列
              pendingRequests.map((callback: Function) => callback());
              pendingRequests.splice(0);
              refreshTokenLock = true;
            }).catch(error => {
              requestResult.code = 10005;
              requestResult.message = CommonRequestErrorEnum.REFRRSHTOKEN_INVALID; 
              return Promise.reject(requestResult); 
            })
          } else {
            // 缓存待重试请求队列。返回 Promise() 实现一直等待执行效果。
            return new Promise((resolve) => {
              pendingRequests.push(
                () => {
                  resolve(requestInstance(response.config))
                }
              )
            })
          }
        }
        // 请求未定义的业务异常情况，直接抛出异常。
        return Promise.reject(requestResult);
      }

      return Promise.resolve(requestResult as any); // 断言 强制跳过 TS 校验
    }
  }, error => {
    const requestResult: RequestResult = {
      api: error.config.url,
      code: error.response.status,
      message: error.response.statusText
    }

    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围

      // TODO 业务异常情况 需要和后端确认字段，处理业务异常码和数据
      // requestResult.code = response.data.status;    

      return Promise.resolve(requestResult);

      // if (error.config.headers.retryRequestCount == undefined 
      //   || error.config.headers.retryRequestCount < retryRequestMaxCount) {
      //   retryRequest(error.config).then(res => {
      //     return Promise.resolve(res);
      //   }).catch(error => {
      //     return Promise.reject(error);
      //   })
      // } else {
      //   return Promise.reject(requestResult);
      // }
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例

      if (error.config.headers.retryRequestCount == undefined 
        || error.config.headers.retryRequestCount < retryRequestMaxCount) {
        retryRequest(error.config).then(res => {
          return Promise.resolve(res);
        }).catch(error => {
          return Promise.reject(error);
        })
      } else {
        requestResult.message = CommonRequestErrorEnum.RESPONSE_BACK_ERROR;
        return Promise.reject(requestResult);
      }
    } else {
      // 发送请求时出了点问题

      if (error.config.headers.retryRequestCount == undefined 
        || error.config.headers.retryRequestCount < retryRequestMaxCount) {
        retryRequest(error.config).then(res => {
          return Promise.resolve(res);
        }).catch(error => {
          return Promise.reject(error);
        })
      } else {
        requestResult.message = CommonRequestErrorEnum.REQUEST_SENT_ERROR;
        return Promise.reject(requestResult);
      }
    }
  }
)

/**
 * 获取最新的 Access Token
 * @returns 
 */
const getAccessToken = (): string => {
  const token = window.localStorage.getItem('token');
  return token ?? "";
}

/**
 * 设置最新的 Access Token
 * @returns 
 */
const setAccessToken = (token) => {
  window.localStorage.setItem('token', token);
}

/**
 * 获取 Refresh Token
 * @returns 
 */
const getRefreshToken = (): string => {
  const token = window.localStorage.getItem('refreshToken');
  return token ?? "";
}

/**
 * 重试请求
 * 注意: 如果代码逻辑存在问题会形成递归死循环。
 * 在拦截器中使用，实现递归的效果。因为 request 函数就包含了拦截器的流程。
 * 停止递归的判断条件就是判断重试次数参数是否大于定义的阀值，在阻止重试请求方法持续执行时，并直接返回结果，请求成功 Resolve 请求失败 Reject 最终会传递到最外层调用处。
 * 重试次数参数是 Headers 的 retryRequestCount 参数，默认为 undefined，重试请求函数每次执行时需要加一，以供下次重试请求使用。
 * @param param
 * @returns 
 */
const retryRequest = (param: RequestConfig) => {
  // 获取最新 Access Token
  param.headers.token = getAccessToken(); 
  // 处理重发次数
  param.headers.retryRequestCount 
    ? param.headers.retryRequestCount ++
    : param.headers.retryRequestCount = 1;
  return requestInstance(param);
}

// 最大重试次数
const retryRequestMaxCount = 2;

// Access Token 刷新锁
let refreshTokenLock = false;
// 待重试请求队列
const pendingRequests = new Array();
/**
 * 刷新 Access Token
 * @returns 
 */
const refreshToken = () => {
  const param: RequestConfig = {
    url: '/refreshtoken', 
    method: 'POST',
    data: {
      refreshToken: getRefreshToken() 
    }
  }
  return requestInstance(param);  
}