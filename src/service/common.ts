import { RequestConfig, requestInstance } from "@/utils/request";

export function mockApi(data: Object) {
  const param: RequestConfig = {
    url: "/todos/1",
    method: "GET",
    params: { id: 1 },
    data: data,
    options: {
      isCatchAllErrorCode: false,
      catchErrorCodeSet: new Set([200]),
    },
  };
  return requestInstance(param);
}
