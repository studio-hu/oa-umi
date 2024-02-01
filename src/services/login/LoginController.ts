import {request} from "@umijs/max";

//  登录接口
export async function loginApi(data: { username: string, password: string }) {
    return request<API.response>(`/login`, {
        method: 'POST',
        data
    })
}