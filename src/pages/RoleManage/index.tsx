import * as React from 'react';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import type {ProColumns} from '@ant-design/pro-components';
import {message, Switch} from "antd";
import {getRoleListApi} from "@/services/role/RoleController";


const columns: Array<ProColumns<API.role>> = [
    {
        title: '序号',
        dataIndex: 'roleId',
        render: (_, __, index) => index + 1,
        align: 'center',
    },
    {
        title: '角色名称',
        dataIndex: 'roleName',
        align: 'center',
    },
    {
        title: '角色关键字',
        dataIndex: 'roleKey',
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
    },
    {
        title: '启用状态',
        dataIndex: 'delStatus',
        align: 'center',
        render: (value) => <Switch checked={!value}/>

    }

]

const RoleManage: React.FC = () => {
    return (
        <PageContainer
            header={{
                title: '角色管理',
            }}
        >
            <ProTable<API.role>
                params={{pageSize: 10, current: 1}}
                columns={columns}
                rowKey={record => record.roleId}
                request={
                    async () => {
                        const res = await getRoleListApi()
                        message.success(res.message)
                        return {
                            data: res.data,
                            success: true,
                        }
                    }
                }
            >
            </ProTable>
        </PageContainer>
    );
}

export default RoleManage;