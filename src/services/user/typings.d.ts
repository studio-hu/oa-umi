declare namespace API {
    interface userList {
        code: string,
        message: string,
        data: {
            // 查询数据列表
            records: Array<user>,
            // 总数
            total: number,
            // 每页显示条数，默认 10
            size: number,
            // 当前页
            current: number,
            // 排序字段
            orders: Array<string>
            // 自动优化 COUNT SQL
            optimizeCountSql: boolean,
            // 是否进行 count 查询
            searchCount: boolean,
            // 单页分页条数限制
            maxLimit: number,
            countId: string,
            // 总页数
            pages: number
        },
        timestamp: string
    }

    interface user {
        // 用户id
        userId: bigint,
        // 用户名
        username: string,
        // 用户手机号
        phone: string,
        // 用户邮箱
        email: string,
        // 更新时间
        updateTime: string,
        // 创建时间
        createTime: string
    }
}
