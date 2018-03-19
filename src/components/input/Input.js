
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './input.scss'
class Input extends Component {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        className: PropTypes.string,
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        children: PropTypes.node,
        disabled: PropTypes.bool,
        size: PropTypes.string,
        multiline: PropTypes.bool,
        icon: PropTypes.string,
        maxLength: PropTypes.number,
        id: PropTypes.string,
        error: PropTypes.string,
        rows: PropTypes.number,
        onKeyPress: PropTypes.func,
        theme: PropTypes.shape({
            icon: PropTypes.string
        })
    }
    static defaultProps = {
        className: '',
        defaultValue: ''
    }
    blur() {
        this.inputNode.blur()
    }
    focus() {
        this.inputNode.focus()
    }
    handleChange = (event) => {
        const { onChange, multiline, maxLength, filedName } = this.props
        const valueFromEvent = event.target.value
        const haveToTrim = (multiline && maxLength && event.target.value.length > maxLength)
        const value = haveToTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent
        if (onChange) onChange(value, event, filedName)
    }
    render() {
        const {
            children,
            className,
            theme,
            value,
            size,
            disabled,
            multiline,
            maxLength,
            onKeyPress,
            icon,
            id,
            error,
            rows = 1,
            ...others
            } = this.props
        const classNames = classnames(
            'JTipt-Container',
            { 'disabled': disabled },
            this.props.className)
        const classes = classnames(
            'JTipt',
            size,
            { 'error': error },
            { 'disabled': disabled },
            className
        )
        const inputElementProps = {
            ...others,
            id: id,
            value: value,
            role: 'input',
            className: classes,
            ref: (node) => { this.inputNode = node },
            disabled: disabled,
            onKeyPress: onKeyPress,
            onChange: this.handleChange
        }
        if (!multiline) {
            inputElementProps.maxLength = maxLength
        } else {
            inputElementProps.rows = rows
        }
        return (
            <div className={classNames}>
                {React.createElement(multiline ? 'textarea' : 'input', inputElementProps)}
            </div>
        )
    }
}

export default Input
