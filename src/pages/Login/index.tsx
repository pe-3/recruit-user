import { useEffect, useState } from 'react'
import Head from '../../components/Head'
import KeepSign from '../../components/KeepSign'
import Logo from '../../components/Logo'
import MyBtn from '../../components/MyBtn'
import Note from '../../components/Note'
import { message } from '../../MSG'
import acat from '../../requests'
import { useNavigate, NavigateFunction, useLocation } from 'react-router-dom'
import MyInput from '../../components/MyInput'
import axios from 'axios'
import ScrollBar from '../../components/ScrollBar'
import { ParsedQs } from 'qs'
import qs from 'qs'
import debounce from '../../funcs/debounce'
const changeHandler = (setVal: React.Dispatch<React.SetStateAction<any>>) => { return (e: { target: { value: any } }) => { setVal(e.target.value) } }
export { changeHandler }
let clickHandler: (...args: any[]) => void = () => undefined;
interface LoginType {
    userid: string,
    password: string
}
function login(props: LoginType, nav: NavigateFunction, type: any) {
    // 判空
    let key: keyof LoginType;
    for (key in props) {
        if (!props[key]) {
            return message.default('请完善表单');
        }
    }

    return acat.login({ data: props }).then(() => {
        let { msg, code, data } = acat.getData('login');
        if (!code) {
            message.success(msg);
            const { Token, isComplete, userInfo } = data;
            if (localStorage.getItem('keepsign') === 'true') {
                localStorage.setItem('access_token', Token);
            }
            axios.defaults.headers = Object.assign(axios.defaults.headers, {
                'access_token': Token
            });
            localStorage.setItem('isComplete', String(isComplete));

            userInfo.is_sign && localStorage.setItem('isSign', 'true');
            // 判断跳转
            isComplete ? (type === 'sign' ? nav('../home/SelectGroup?type=sign') : nav('../home/SelectGroup')) : nav('../home');

            if (isComplete) {
                localStorage.setItem('menustep', 1 + '')
            } else {
                localStorage.setItem('menustep', 0 + '')
            }
            // 存储用户信息
            userInfo && localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            message.error(msg);
            throw msg;
        }
    })
}

export default function Login() {
    // 判断是否 签到
    const location = useLocation();
    const searchstr: string = location.search;
    const search: ParsedQs = qs.parse(searchstr.slice(1));
    const { type } = search;
    const navigate = useNavigate();
    const [pass, setPass] = useState<string>('');
    const [account, setAccount] = useState<string>('');

    useEffect(() => {
        clickHandler = debounce(login);
        return () => undefined;
    }, [])
    return (
        <ScrollBar className='auth-form'>
            <Logo />
            <Head head='ACAT 纳新' />
            <Note note='请输入你的教务系统学号和密码进行登录，如果没有录入会登录失败，再进行注册' />
            <form>
                <MyInput label='学号' onChange={changeHandler(setAccount)} />
                <MyInput passsafe label='密码' onChange={changeHandler(setPass)} />
            </form>
            <KeepSign
                className="Checkbox"
                onChange={(checked) => { localStorage.setItem('keepsign', String(checked)) }}

            />
            <MyBtn
                className='input-item'
                type='contained'
                onClick={() =>
                    clickHandler({
                        userid: account,
                        password: pass
                    }, navigate, type)
                }
            >登录</MyBtn>
            <MyBtn
                className='input-item'
                type='text'
                onClick={() => navigate('./sign')}
            >还没账号？注册</MyBtn>
        </ScrollBar >
    )
}
