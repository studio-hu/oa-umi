declare namespace API {
    interface permissionList {
        code: string,
        message: string,
        data: Array<permission>,
        timestamp: string
    }

    interface permission {
        // 权限id
        permissionId: bigint,
        // 权限名称
        permissionName: string,
        // 权限关键字
        permissionKey: string,
        // 逻辑删除
        delStatus: number,
        // 更新时间
        updateTime: string,
        // 创建时间
        createTime: string
    }
}
