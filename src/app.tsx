// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import {RuntimeConfig} from "@@/core/defineApp";
import type {RequestConfig} from 'umi';
import JSONBig from "json-bigint";
import {Avatar, Dropdown, message} from "antd";
import {
    GithubFilled,
    InfoCircleFilled, LogoutOutlined,
    PlusCircleFilled,
    QuestionCircleFilled,
    SearchOutlined, UserOutlined,
} from '@ant-design/icons';

// 登录逻辑，此函数会放回登录的信息
export async function getInitialState(): Promise<{ name?: string | null, avatar?: string | null }> {
    return {
        name: '追梦路上的孩子',
        avatar: 'https://blog.hyqstudio.top/img/logo_circle.png'
    };
}

// initialState上面登录返回的数据
export const layout: RuntimeConfig['layout'] = ({initialState}) => {
        return {
            siderWidth: 256,
            // 左上角logo后面的名称
            title: 'OA一体化平台',
            // 左上角logo
            logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',

            avatarProps: {
                // 右上角头像
                src: initialState?.avatar || 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                // 右上角用户名称
                title: initialState?.name || '未登录',
                size:'small',
                render: (props, dom) => {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: 'logout',
                                        icon: <LogoutOutlined/>,
                                        label: '退出登录',
                                        onClick: () => {
                                            console.log('退出登录')
                                        }
                                    },
                                ],
                            }}
                        >
                            {dom}
                        </Dropdown>
                    );
                },

            },
            actionsRender: () => {
                return [
                    <InfoCircleFilled key="InfoCircleFilled"/>,
                    <QuestionCircleFilled key="QuestionCircleFilled"/>,
                    <GithubFilled key="GithubFilled"/>,
                ]
            },
            menuFooterRender: (props) => {
                if (props?.collapsed) return undefined;
                return (
                    <p
                        style={{
                            textAlign: 'center',
                            paddingBlockStart: 12,
                        }}
                    >
                        © 2021 Made with love<br/>
                        by studio-hu
                    </p>
                );
            },
            // menuExtraRender:()=>{
            //     return <div>广告区域</div>
            // }


            // logout: (initialState) => {
            //     console.log(initialState)
            // },
            // rightRender: (initialState, props) => {
            //     console.log(initialState)
            //     return <Avatar size="small" icon={<UserOutlined/>}/>
            // }




        }

    }
;

interface ResponseStructure {
    code: string,
    message: string,
    data: Object[],
    timestamp: string
}

export const request: RequestConfig = {
    baseURL: 'http://127.0.0.1:8080',
    timeout: 10000,
    errorConfig: {
        errorThrower: (res: ResponseStructure) => {
            console.log("re", res)
            if (res.code !== '000000') {
                throw new Error(res.message);
            }
        },
        errorHandler: (err: any) => {
            console.log("err", err)
            message.error("系统错误")
        }
    },
    requestInterceptors: [
        (config: any) => {
            let token: string = localStorage.getItem('accessToken') || '';
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }
    ],
    responseInterceptors: [
        (response: any) => {
            return response
        }
    ],
    transformResponse: [function (data: any) {
        const json = JSONBig({
            storeAsString: true,
        });
        return json.parse(data);
    }]
};