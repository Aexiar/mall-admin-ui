// 接口返回类型
type Result<T = {} | null> = {
  // 状态码
  code: number;
  // 返回数据
  data: T;
  // 提示消息
  msg: string;
  // 时间戳
  timestamp: string;
};

// 对接口返回类型进行 Promise 限定
type PromiseResult<T> = Promise<Result<T>>;
