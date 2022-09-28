import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Fragment } from 'react';

export default function BackHeader(props: { title: string }) {
    const { title } = props;
    return (
        <Fragment>
            <div className="left-header">
                <IconBack />
                <h3 className='lefthead-title'>{title}</h3>
            </div>
        </Fragment>

    )
}

function IconBack() {
    const navigate = useNavigate();
    return (<IconButton onClick={() => { navigate('/home') }}>
        <ArrowBackIcon />
    </IconButton>)
}