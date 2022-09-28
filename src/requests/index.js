import acatReq from 'acat-req';

const reqOpts = [
    {
        url: 'testToken',
        name: 'testToken',
    },
    {
        url: 'user/user/sendVerifyEmail',
        name: 'sendVeriCode',
        method: 'post',
    },
    {
        url: 'user/user/signup',
        name: 'signup',
        method: 'post',
    },
    {
        url: 'user/user/login',
        name: 'login',
        method: 'post'
    },
    {
        url: "user/user/resetPassword",
        name: 'resetPass',
        method: 'post'
    },
    {
        url: 'user/user/updateInf',
        name: 'updateInf',
        method: 'post'
    },
    {
        url: 'user/user/sign',
        name: 'sign'
    },
    {
        url: 'user/user/resetEmail',
        name: 'resetEmail',
        method: 'post'
    },
    //面试者部分
    {
        url: "interview/user/get",
        name: 'getInterRes'
    },
];

const defaultOpts = {
    headers: {
        'Content-Type': 'application/json',
        'access_token': localStorage.getItem('access_token')
    },
    baseURL: 'https://ali.newimg.ltd:20001/'
}

const acat = acatReq(reqOpts, defaultOpts);

export default acat


