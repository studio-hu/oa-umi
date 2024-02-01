import {request} from "@umijs/max";


export async function getUserList(currentPage: number, pageSize: number) {
    return request<API.userList>(`/user/list/${currentPage}/${pageSize}`, {
        method: 'GET'
    })
}