import { Component } from 'react'
import Avatar from '@mui/material/Avatar';
interface Props {
    size?: number,
    avatar?: string
    isCenter?: boolean,
    style?: React.CSSProperties | undefined,
    className?: string,
    variant?: "square" | "circular" | "rounded"
}
export default class MyAvatar extends Component<Props, {}> {
    render() {
        let { avatar, size, isCenter } = this.props;
        avatar = avatar ? avatar : require('../../assets/img/logo.jpeg');
        return (
            <Avatar
                style={{ width: size + 'px', height: 'auto', margin: isCenter ? '0 auto' : '', ...this.props.style }}
                src={avatar}
                alt="avatar"
                className={this.props.className}
                variant={this.props.variant}
            />
        )
    }
}
