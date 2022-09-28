import TextField from '@mui/material/TextField';
import { Component } from 'react'
import { $inputGroup } from '../../styles';

interface Props {
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}

export default class MailInput extends Component<Props, {}> {
    render() {
        return (
            <TextField id="outlined-basic" label="邮箱" variant="outlined" className={this.props.className} style={$inputGroup} onChange={this.props.onChange}/>
        );
    }
}
