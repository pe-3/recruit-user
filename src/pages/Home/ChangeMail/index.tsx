import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../../components/BackHeader";
import MailInput from "../../../components/MailInput";
import MyBtn from "../../../components/MyBtn";
import { message } from "../../../MSG";
import acat from "../../../requests";
import { changeHandler } from "../../Login";
import { RegEmail } from "../../Start";

export default function ChangeMail() {
    const [email, setMail] = useState('');
    const navigate = useNavigate();
    function sendMail(email: string) {
        if (!email) {
            return message.default('请输入邮箱');
        }
        if (!RegEmail.test(email)) {
            return message.error('邮箱格式错误');
        }
        acat.sendVeriCode({
            data: {
                "action": "修改",
                email
            }
        }).then(() => {
            let { msg, code } = acat.getData('sendVeriCode');
            if (!code) {
                message.success(msg);
                navigate('../ResetMail?mail=' + email);
            } else {
                message.error(msg);
            }
        })
    }
    return (
        <div className="auth-home">
            <BackHeader title="Reset Mail" />
            <MailInput onChange={changeHandler(setMail)} />
            <MyBtn type='contained' onClick={() => sendMail(email)}>下一步（发送验证码）</MyBtn>
        </div>
    )
}
