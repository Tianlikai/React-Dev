
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
class FormItem extends PureComponent {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        hint: PropTypes.string,
        id: PropTypes.string,
        theme: PropTypes.shape({
            hint: PropTypes.string
        })
    }
    static defaultProps = {
        className: ''
    }
    render() {
        const {
            children,
            className,
            hintClassName,
            theme,
            id,
            hint,
            ...others
            } = this.props
        const classes = classnames(
            'JTformItem',
            className
        )
        const labelClassName = classnames(
            { 'withHint': theme && theme.hint }
        )
        return (
            <div
                className={classes}>
                {this.props.children}
                {hint ?
                    <label
                        htmlFor={id}
                        className={labelClassName}>
                        {hint}
                    </label> : null}
            </div>
        )
    }
}

export default FormItem
