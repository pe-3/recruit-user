import { useEffect, useState } from 'react'
import Head from '../../components/Head'
import Logo from '../../components/Logo'
import MailInput from '../../components/MailInput'
import MyBtn from '../../components/MyBtn'
import Note from '../../components/Note'
import { message } from '../../MSG'
import acat from '../../requests'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import ScrollBar from '../../components/ScrollBar'
import debounce from '../../funcs/debounce'
function sendMail(email: string, nav: NavigateFunction) {
    if (!email) {
        return message.default('请输入邮箱');
    }
    if (!RegEmail.test(email)) {
        return message.error('邮箱格式错误');
    }
    return acat.sendVeriCode({
        data: {
            "action": "注册",
            email
        }
    }).then(() => {
        let { msg, code } = acat.getData('sendVeriCode');
        if (!code) {
            message.success(msg);
            nav('../setpass?mail=' + email);
        } else {
            message.error(msg);
            throw msg;
        }
    })
}
let clickHandler: (...args: any[]) => void = () => undefined;
export default function Start() {
    const [mail, setMail] = useState<string>('');
    const navigate = useNavigate();
    useEffect(() => {
        clickHandler = debounce(sendMail);
        return () => { }
    }, [])

    return (
        <ScrollBar className='auth-form'>
            <Logo />
            <Head head='ACAT 纳新' />
            <Note note='请输入你邮箱来注册报名一只猫应用技术协会的2022纳新' />
            <MailInput
                className='input-item'
                onChange={
                    (e) => {
                        setMail(e.target.value);
                    }
                }
            />
            <p className='Checkbox' style={{ fontSize: '12px', color: 'rgb(112, 117, 121)' }}><span>默认输入教务系统学号和密码即可登录，无需注册</span></p>
            <MyBtn
                className='input-item'
                type='contained'
                onClick={
                    () => clickHandler(mail, navigate)
                }
            >下一步（发送验证码）</MyBtn>
            <MyBtn className='input-item' type='text' onClick={() => navigate('../')}>已有账号？登录</MyBtn>
        </ScrollBar >
    )
}



const RegEmail = /^[\w\d]{1,}@[\w]{1,}\.com$/;
export { RegEmail }