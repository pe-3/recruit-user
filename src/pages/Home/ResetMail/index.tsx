import qs, { ParsedQs } from "qs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackHeader from "../../../components/BackHeader";
import MailShow from "../../../components/MailShow";
import MyBtn from "../../../components/MyBtn";
import MyInput from "../../../components/MyInput";
import debounce from "../../../funcs/debounce";
import { message } from "../../../MSG";
import acat from "../../../requests";
import { changeHandler } from "../../Login";
let clickHandler: (...args: any[]) => void = () => undefined;

export default function ResetMail() {
    const location = useLocation();
    const searchstr: string = location.search;
    const search: ParsedQs = qs.parse(searchstr.slice(1));
    const { mail } = search;
    const navigate = useNavigate();

    const [code, setCode] = useState<string>('');
    const [account, setAccount] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    
    useEffect(() => {
        clickHandler = debounce(resetmail);
        return () => { }
    }, [])

    return (
        <div className="auth-home">
            <BackHeader title="Reset Mail" />
            <MailShow mail={mail} onClick={() => navigate('../ChangeMail')} />
            <MyInput label='验证码' onChange={changeHandler(setCode)} />
            <MyInput label='账户' onChange={changeHandler(setAccount)} />
            <MyInput label='密码' onChange={changeHandler(setPass)} passsafe />
            <MyBtn type='contained' onClick={
                () => clickHandler({
                    verifyCode: code,
                    userid: account,
                    password: pass,
                    newEmail: mail as string
                })
            }>重置邮箱</MyBtn>
        </div>
    )
}
type Props = {
    verifyCode: string,
    newEmail: string,
    userid: string,
    password: string,
}


function resetmail(props: Props) {
    let key: keyof Props;
    for (key in props) {
        if (!props[key]) {
            return message.default('请完善表单');
        }
    }

    return acat.resetEmail({
        data: props
    }).then(() => {
        let { msg, code } = acat.getData('resetEmail');
        code ? message.error(msg) : message.success(msg);
        if (!code) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
            userInfo.email = props.newEmail;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            throw msg
        }
    })
}