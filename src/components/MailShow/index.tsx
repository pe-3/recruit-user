import { Component } from 'react'
import CreateIcon from '@mui/icons-material/Create';

interface Props {
    className?: string,
    mail: any,
    onClick?: () => void,
}

export default class MailShow extends Component<Props, {}> {
    render() {
        let mail: string;
        if (typeof this.props.mail !== 'string') {
            mail = '';
        } else {
            mail = this.props.mail;
        }
        return (
            <h1 className={this.props.className}>
                <span className='text-limit'>{mail}</span>
                <CreateIcon className='mail-edit' onClick={this.props.onClick} />
            </h1>
        )
    }
}
