import TextField from '@mui/material/TextField';
import { Component, ReactNode } from 'react'
import { $inputGroup } from '../../styles';

interface Props {
    className?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
    label: string,
    passsafe?: boolean,
    id?: string,
    name?: string,
    value?: string,
    disabled?: boolean,
    suffix?: ReactNode
}

export default class MyInput extends Component<Props, {}> {
    render() {
        return (
            <div style={{ position: 'relative' }} className={this.props.className}>
                <TextField
                    id={this.props.id}
                    label={this.props.label}
                    variant="outlined"
                    type={this.props.passsafe ? 'password' : 'text'}
                    className={this.props.className}
                    style={$inputGroup}
                    onChange={this.props.onChange}
                    name={this.props.name}
                    value={this.props.value}
                    disabled={this.props.disabled}
                />
                <div className="input-suffix">{this.props.suffix}</div>
            </div>

        );
    }
}
