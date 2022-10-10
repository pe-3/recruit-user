import { useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom'
import CustomizedSteppers from '../../components/MySteper';
import ScrollBar from '../../components/ScrollBar';
import { message } from '../../MSG';
import acat from '../../requests';

export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        acat.testToken().then(() => {
            let { msg, code } = acat.getData('testToken');
            code && message.error(msg + '，请重新登录');
            if (code) {
                navigate('/');
            }
        })
        return () => {

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const outlet = useOutlet();
    return (
        <ScrollBar className='auth-home'>
            <div className="outlet-wrapper">
                {outlet}
            </div>
            <CustomizedSteppers />
        </ScrollBar>
    )
}
