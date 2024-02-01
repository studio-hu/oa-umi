import * as React from 'react';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import type {ProColumns} from '@ant-design/pro-components';
import {getUserList} from '@/services/user/UserController'
import {message} from "antd";


const columns: Array<ProColumns<API.user>> = [
    {
        title: '序号',
        dataIndex: 'userId',
        render: (_, __, index) => index + 1,
        align: 'center',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        align: 'center',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        align: 'center',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        align: 'center',
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        align: 'center',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        align: 'center',
    }

]

const UserManage: React.FC = () => {

    return (
        <PageContainer
            header={{
                title: '用户管理',
            }}
        >
            <ProTable<API.user, { pageSize: number, current: number }>
                params={{pageSize: 10, current: 1}}
                columns={columns}
                rowKey={record => record.userId}
                request={
                    async ({pageSize, current}) => {
                        const res = await getUserList(current, pageSize)
                        message.success(res.message)
                        return {
                            data: res.data.records,
                            success: true,
                            total: res.data.total
                        }
                    }
                }
            >
            </ProTable>
        </PageContainer>
    );
}

export default UserManage;