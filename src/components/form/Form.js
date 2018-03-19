
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './theme.scss'
class Form extends Component {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        formErr: PropTypes.string,
        onSubmit: PropTypes.func
    }
    static defaultProps = {
        className: ''
    }
    handleSubmit = (e) => {
        let { onSubmit } = this.props
        if (onSubmit) onSubmit(e)
    }
    render() {
        const {
            children,
            className,
            ...others
            } = this.props
        const classes = classnames(
            'JTform',
            className
        )
        return (
            <form
                id='JTform'
                className={classes}
                onSubmit={this.handleSubmit}>
                {
                    this.props.formErr ?
                        <label className='form-err' htmlFor="JTform">{this.props.formErr}</label> :
                        null
                }
                {this.props.children}
            </form>
        )
    }
}

export default Form
