import { Component } from 'react'
import './head.css'

export default class Head extends Component<{
    head: string
}> {
    render() {
        return (
            <h1 className='head'>{this.props.head}</h1>
        )
    }
}
