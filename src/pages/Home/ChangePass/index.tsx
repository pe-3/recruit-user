import React, { useEffect, useState } from 'react'
import BackHeader from '../../../components/BackHeader'
import MyBtn from '../../../components/MyBtn'
import MyInput from '../../../components/MyInput'
import debounce from '../../../funcs/debounce';
import { message } from '../../../MSG';
import acat from '../../../requests';
import { changeHandler } from '../../Login';
let clickHandler: (...args: any[]) => void = () => undefined;

export default function ChangePass() {
    const [userid, setUserid] = useState('');
    const [password, setPass] = useState('');
    const [new_password, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    useEffect(() => {
        clickHandler = debounce(resetPass);
        return () => { }
    }, [])

    const contrastPass = (): boolean => {
        if (new_password !== confirm) {
            setPass(''); setNewPass('');
            message.error('两次密码不一致，重新输入');
            return false;
        }
        return true;
    }
    return (
        <div className='auth-home'>
            <BackHeader title='Reset pass' />
            <MyInput label='账号' onChange={changeHandler(setUserid)} />
            <MyInput label='原密码' onChange={changeHandler(setPass)} />
            <MyInput label='密码' passsafe onChange={changeHandler(setNewPass)} />
            <MyInput label='确认密码' passsafe onChange={changeHandler(setConfirm)} />
            <MyBtn type='contained' onClick={
                debounce(
                    () =>
                        clickHandler({ userid, password, new_password, confirm }, contrastPass)
                )}>重置密码</MyBtn>
        </div>
    )
}

type Reset = {
    userid: string,
    password: string,
    new_password: string,
    confirm?: string
}

function resetPass(props: Reset, callBack: () => boolean) {
    // 判空
    let key: keyof Reset;
    for (key in props) {
        if (!props[key]) {
            return message.default('请完善表单');
        }
    }
    if (!callBack()) {
        delete props.confirm;
        return;
    }

    return acat.resetPass({
        data: props
    }).then(() => {
        let { msg, code } = acat.getData('resetPass');
        code ? message.error(msg) : message.success(msg);
        throw msg;
    })
}