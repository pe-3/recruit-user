import { Component, ReactNode } from 'react'
import { $inputGroup } from '../../styles'
import { Ripple } from 'awesome-mui-ripple'
import Button from '@mui/material/Button';

interface Props {
    className?: string
    onClick?: (e: Event) => void
    children?: ReactNode,
    type?: "text" | "outlined" | "contained" | undefined,
}

export default class MyBtn extends Component<Props, {}> {
    ripple = new Ripple();
    render() {
        return (
            <Button
                variant={this.props.type}
                className={this.props.className}
                style={$inputGroup}
                disableFocusRipple
                disableRipple
                onClick={(e: any) => {
                    this.ripple.animate(e, 'dark');
                    if (this.props.onClick) {
                        this.props.onClick(e);
                    }
                }}
            >
                {this.props.children}
            </Button>
        )
    }
}
