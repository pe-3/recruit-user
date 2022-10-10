import MailShow from '../../components/MailShow'
import MyAvatar from '../../components/MyAvatar'
import Note from '../../components/Note'
import { useLocation, useNavigate, NavigateFunction } from 'react-router-dom'
import qs, { ParsedQs } from 'qs'
import MyInput from '../../components/MyInput'
import MyBtn from '../../components/MyBtn'
import { useEffect, useState } from 'react'
import { message } from '../../MSG'
import acat from '../../requests'
import ScrollBar from '../../components/ScrollBar'
import debounce from '../../funcs/debounce'

let clickHandler: (...args: any[]) => void = () => undefined;

export default function CodeIn() {
    const location = useLocation();
    const searchstr: string = location.search;
    const search: ParsedQs = qs.parse(searchstr.slice(1));
    const { mail } = search;
    const navigate = useNavigate();
    const [code, setCode] = useState<string>('');
    const [account, setAccount] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [passconfirm, setPassconfirm] = useState<string>('');
    const changeHandler = (setVal: React.Dispatch<React.SetStateAction<string>>) => { return (e: { target: { value: any } }) => { setVal(e.target.value) } }
    const clearPass = () => { setPass(''); setPassconfirm(''); }

    useEffect(() => {
        clickHandler = debounce(signup);
        return () => undefined;
    }, [])

    return (
        <ScrollBar className='auth-form'>
            <MyAvatar size={160} isCenter style={{ marginTop: '-2rem' }} />
            <MailShow mail={mail} onClick={() => navigate('../sign')} />
            <Note note="我们已经给你的邮箱发送了验证码，请不要告诉他人" />
            <form>
                <MyInput label='验证码' name='code' onChange={changeHandler(setCode)} />
                <MyInput label='账号：可为学号' name='account' onChange={changeHandler(setAccount)} />
                <MyInput value={pass} label='密码' passsafe name='pass' onChange={changeHandler(setPass)} />
                <MyInput value={passconfirm} label='确认密码' passsafe name='pass-confirm' onChange={changeHandler(setPassconfirm)} />
            </form>
            <MyBtn
                className='input-item'
                type='contained'
                onClick={debounce(
                    () => clickHandler({
                        verifyCode: code,
                        email: mail as string,
                        userid: account,
                        password: pass,
                        passconfirm
                    }, clearPass, navigate))}
            >下一步</MyBtn>
        </ScrollBar>
    )
}

interface Props {
    verifyCode: string,
    email: string,
    userid: string,
    password: string,
    passconfirm?: string
}
function signup(props: Props, callback: () => void, nav: NavigateFunction) {
    let key: keyof Props;
    for (key in props) {
        if (!props[key]) {
            return message.default('请完善表单');
        }
    }
    if (!contrast(props)) {
        callback();
        return message.error('两次密码不一致，请重新输入');
    }
    delete props.passconfirm

    return acat.signup({
        data: props
    }).then(() => {
        let { msg, code } = acat.getData('signup')?.signResult;
        if (!code) {
            message.success(msg);
            nav('../');
        } else {
            message.error(msg);
            throw msg;
        }
    })
}

function contrast({ password: pass1, passconfirm: pass2 }: Props): boolean {
    return pass1 === pass2
}