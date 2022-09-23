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

// 分页接口返回的数据类型
type PaginationReturn<T = any> = {
    countId: number | null,
    current: number | null, // 当前页码
    maxLimit: number | null,
    optimizeCountSql: boolean | null,
    pages: number | null,
    searchCount: boolean | null,
    orders: object [] | null,
    size: number | null, // 每页显示条数
    total: number, // 总条数
    records: T[]  // 记录数
}


