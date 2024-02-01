import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    UserOutlined, WechatOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import {Space, Tabs, message} from 'antd';
import type {CSSProperties} from 'react';
import {useState} from 'react';
import styles from './index.less'
import {loginApi} from '@/services/login/LoginController'
import {useNavigate} from "@umijs/max";

type LoginType = 'phone' | 'account';
const iconStyles: CSSProperties = {
    marginInlineStart: '16px',
    color: 'rgba(204,204,204,0.8)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};
export default () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState<LoginType>('account');


    const submitHandler = async (values: any) => {
        let {username, password} = values
        console.log('Success:', values);
        let res = await loginApi({username, password});
        console.log(res)
        if (res.code !== '000000') {
            message.error(res.message)
        } else {
            localStorage.setItem('accessToken', res.data.accessToken)
            localStorage.setItem('refreshToken', res.data.refreshToken)
            message.success(res.message)
            navigate('/', {replace: true})
        }
    }

    return (
        <ProConfigProvider hashed={false}>
            <div className={styles.container}>
                <LoginForm
                    logo="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg"
                    title="OA一体化平台"
                    subTitle="--小胡工作室--"
                    actions={
                        <Space>
                            其他登录方式
                            <WechatOutlined style={iconStyles}/>
                            <AlipayCircleOutlined style={iconStyles}/>
                            <WeiboCircleOutlined style={iconStyles}/>
                        </Space>
                    }
                    onFinish={submitHandler}
                >
                    <Tabs
                        centered
                        activeKey={loginType}
                        onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                        items={[{
                            key: 'account',
                            label: '账号密码登录',
                        }, {
                            key: 'phone',
                            label: '手机验证码登录',
                        }]}
                    />
                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'用户名/手机号/邮箱'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名/手机号/邮箱!',
                                    },
                                    {
                                        pattern: /^(?:[\u4e00-\u9fa5a-zA-Z0-9_-]{3,16}|1[3456789]\d{9}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                        message: '用户名/手机号/邮箱格式不正确!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                placeholder={'密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9]{6,20}$/,
                                        message: '密码由6~20位数字或字母组成！',
                                    }
                                ]}
                            />
                            <div style={{marginBlockEnd: 24}}>
                                <a style={{float: 'right', marginBottom: 24}}>
                                    忘记密码
                                </a>
                            </div>
                        </>

                    )}
                    {loginType === 'phone' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined className={'prefixIcon'}/>,
                                }}
                                name="mobile"
                                placeholder={'手机号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'}/>,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={'请输入验证码'}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${'获取验证码'}`;
                                    }
                                    return '获取验证码';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                    {
                                        pattern: /^\d{4}$/,
                                        message: '验证码格式错误！',
                                    },
                                ]}
                                onGetCaptcha={async () => {
                                    message.success('获取验证码成功！验证码为：1234');
                                }}
                            />
                        </>
                    )}
                </LoginForm>

            </div>
        </ProConfigProvider>
    );
};