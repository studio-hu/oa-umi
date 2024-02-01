import {request} from "@umijs/max";


export async function getPermissionListApi() {
    return request<API.permissionList>(`/permission/list`, {
        method: 'GET'
    })
}