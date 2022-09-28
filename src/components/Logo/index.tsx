import { Component } from 'react'

interface Props {
    size?: number,
    mr?: string
}

export default class Logo extends Component<Props> {

    render() {
        const { size = 140 } = this.props;
        return (
            <img
                style={{ width: size, height: 'auto', marginRight: this.props.mr }}
                src={require('../../assets/img/logo.jpeg')}
                alt='lamp'
                className='nodrag'
            />
        )
    }
}
