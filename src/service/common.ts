import { RequestConfig, requestInstance } from "@/utils/request";

export function mockApi(data: Object) {
  const param: RequestConfig = {
    url: '/api', 
    method: 'POST',
    params: { id: 1 }, 
    data: data, 
    options: {
      isCatchAllErrorCode: false,
      catchErrorCodeSet: new Set([200])
    }
  }
  return requestInstance(param);
}