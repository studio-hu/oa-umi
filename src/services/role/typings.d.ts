declare namespace API {
    interface roleList {
        code: string,
        message: string,
        data: Array<role>,
        timestamp: string
    }

    interface role {
        // 权限id
        roleId: bigint,
        // 权限名称
        roleName: string,
        // 权限关键字
        roleKey: string,
        // 逻辑删除
        delStatus: number,
        // 更新时间
        updateTime: string,
        // 创建时间
        createTime: string
    }
}
