import * as React from 'react';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import type {ProColumns} from '@ant-design/pro-components';
import {message, Switch, Tag} from "antd";
import {getPermissionListApi} from "@/services/permission/PermissionController";


const columns: Array<ProColumns<API.permission>> = [
    {
        title: '序号',
        dataIndex:'permissionId',
        render: (_, __, index) => index + 1,
        align: 'center',
    },
    {
        title: '权限名称',
        dataIndex: 'permissionName',
        align: 'center',
    },
    {
        title: '权限关键字',
        dataIndex: 'permissionKey',
        align: 'center',
        render: (_, entity) => {
            let value = entity.permissionKey;
            let pos: number = value.lastIndexOf(':') + 1;
            let str: string = value.substring(pos);
            switch (str) {
                case  "insert":
                    return <Tag color={"processing"}>{value}</Tag>;
                case  "delete":
                    return <Tag color={"error"}>{value}</Tag>;
                case  "update":
                    return <Tag color={"warning"}>{value}</Tag>;
                case  "select":
                    return <Tag color={"success"}>{value}</Tag>;
                default:
                    return <Tag color={"default"}>{value}</Tag>;
            }
        },
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

const PermissionManage: React.FC = () => {
    return (
        <PageContainer
            header={{
                title: '用户管理',
            }}
        >
            <ProTable<API.permission>
                params={{pageSize: 10, current: 1}}
                columns={columns}
                rowKey={record => record.permissionId}
                request={
                    async () => {
                        const res = await getPermissionListApi()
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

export default PermissionManage;