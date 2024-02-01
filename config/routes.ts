export default [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/login',
        component: '@/pages/Login',
        layout: false,
    },
    {
        name: '首页',
        icon: 'SignalFilled',
        path: '/home',
        component: '@/pages/Home',
    },
    {
        name: '系统管理',
        icon: 'SettingFilled',
        path: '/system',
        routes: [

            {
                name: '用户管理',
                // icon: 'TeamOutlined',
                path: 'user-manage',
                component: '@/pages/UserManage',
            },
            {
                name: '权限管理',
                // icon: 'UserOutlined',
                path: 'permission-manage',
                component: '@/pages/PermissionManage',
            },
            {
                name: '角色管理',
                // icon: 'ClusterOutlined',
                path: 'role-manage',
                component: '@/pages/RoleManage',
            }
        ]
    },
    {
        name: ' CRUD 示例',
        path: '/table',
        component: '@/pages/Table',

    },
    {path: '/*', component: '@/pages/404', layout: false},
]