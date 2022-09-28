import { useNavigate, useOutlet } from 'react-router-dom'
import CustomizedSteppers from '../../components/MySteper';
import ScrollBar from '../../components/ScrollBar';
import { message } from '../../MSG';
import acat from '../../requests';

export default function Home() {
    const navigate = useNavigate();
    acat.testToken().then(() => {
        let { msg, code } = acat.getData('testToken');
        code && message.error(msg);
        if (code) {
            navigate('/');
            message.info('请重新登录');
        }
    })

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
