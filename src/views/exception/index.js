import React, { Component } from 'react'
import exceptions from './constants'
import './theme.scss'

class Exception extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        let { params: {
            status
        } } = this.props
        document.title = `${status} - React Wanted`
    }
    render() {
        let { params: {
            status
        } } = this.props
        return (
            <div
                className='exceptions-container'>
                <h1>{status}</h1>
                <h4>{exceptions[status]}</h4>
            </div>
        )
    }
}
export default Exception
