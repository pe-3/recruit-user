import { Checkbox } from '@mui/material'
import { Component } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
interface Props {
    className: string,
    onChange: (checked: boolean) => void,
    checked?: boolean
}

export default class KeepSign extends Component<Props, {}> {
    render() {
        return (
            <div className={this.props.className}>
                <FormControlLabel
                    label="Keep me signed"
                    control={
                        <Checkbox onChange={(e, checked) => { this.props.onChange(checked) }}
                            defaultChecked={localStorage.getItem('keepsign') === 'true'}
                        />
                    }
                />
            </div>
        )
    }
}
