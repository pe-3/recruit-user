import React, { ReactNode } from "react"
import CodeIn from "../pages/Codein"
import Home from "../pages/Home"
import ChangeMail from "../pages/Home/ChangeMail"
import ChangePass from "../pages/Home/ChangePass"
import FinishInfo from "../pages/Home/FinishInfo"
import ResetMail from "../pages/Home/ResetMail"
import SelectGroup from "../pages/Home/SelectGroup"
import ViewResult from "../pages/Home/ViewResult"
import Login from "../pages/Login"
import Start from "../pages/Start"

type Route = {
    path: string,
    name: string,
    element: ReactNode,
    nodeRef: React.MutableRefObject<null>,
    children?: Route[]
}

const routes: Route[] = [
    {
        path: 'sign',
        name: 'sign',
        element: (<Start />),
        nodeRef: React.createRef()
    },
    {
        path: 'setpass',
        name: 'signup',
        element: (<CodeIn />),
        nodeRef: React.createRef()
    },
    {
        path: '/',
        name: 'login',
        element: (<Login />),
        nodeRef: React.createRef()
    },
    {
        path: '/home',
        name: 'home',
        element: (<Home />),
        nodeRef: React.createRef(),
        children: [
            {
                path: '',
                name: 'FinishInfo',
                element: (<FinishInfo />),
                nodeRef: React.createRef(),
            },
            {
                path: 'SelectGroup',
                name: 'SelectGroup',
                element: (<SelectGroup />),
                nodeRef: React.createRef(),
            },
            {
                path: 'ViewResult',
                name: 'ViewResult',
                element: (<ViewResult />),
                nodeRef: React.createRef(),
            },

        ]
    }, {
        path: 'ChangePass',
        name: 'ChangePass',
        element: (<ChangePass />),
        nodeRef: React.createRef(),
    },
    {
        path: 'ChangeMail',
        name: 'ChangeMail',
        element: (<ChangeMail />),
        nodeRef: React.createRef(),
    },
    {
        path: 'ResetMail',
        name: 'ResetMail',
        element: (<ResetMail />),
        nodeRef: React.createRef(),
    },
]

export default routes