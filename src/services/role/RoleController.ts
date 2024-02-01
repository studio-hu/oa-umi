import {request} from "@umijs/max";


export async function getRoleListApi() {
    return request<API.roleList>(`/role/list`, {
        method: 'GET'
    })
}