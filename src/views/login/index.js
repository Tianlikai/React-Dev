import React, { Component } from 'react'
import { connect } from 'react-redux'
import Form from '../../components/form/Form'
import FormItem from '../../components/form/FormItem'
import Input from '../../components/input/Input'
import './login.scss'
import logo from '../../assets/img/favicon.png'
import { loginAcion, navigate } from './action'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filed: {
                user: '',
                password: ''
            },
            errorMessage: {
                unError: '',
                pwdError: ''
            },
            formMessage: ''
        }
    }
    componentWillMount() {
        // console.info('[Navbar] 初始化：检查用户是否已经登录')
        // console.info('[TIPS] 由于有Redux Logger，故之后就不手动打印动作了')
        // this.props.checkLogin()
    }
    handleOnChange = (val, e, filedName) => {
        let filed = Object.assign({}, this.state.filed)
        filed[filedName] = val
        this.setState({
            filed: filed
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let { filed } = this.state
        this.props.loginAcion(filed)
        // let errorMessage = Object.assign({}, this.state.errorMessage)
        // let unError = '用户名不能为空!'
        // let pwdError = '密码不能为空!'
        // let inputWrong = '用户名或密码输入错误!'
        // if (!filed.username) {
        //     errorMessage.unError = unError
        // } else {
        //     errorMessage.unError = ''
        // }
        // if (!filed.password) {
        //     errorMessage.pwdError = pwdError
        // } else {
        //     errorMessage.pwdError = ''
        // }
        // if (filed.username === 'tianlikai' && filed.password === '123') {
        //     this.setState({
        //         errorMessage: {
        //             unError: '',
        //             pwdError: ''
        //         },
        //         formMessage: ''
        //     })
        //     return true
        // } else {
        //     this.setState({
        //         errorMessage: errorMessage,
        //         formMessage: inputWrong
        //     })
        //     return false
        // }
    }
    render() {
        const { user: userInfo, navigate } = this.props
        if (userInfo) {
            debugger
            navigate('/main')
        }
        let {
            formMessage,
            filed: {
                user,
                password
            },
            errorMessage: {
                unError,
                pwdError
            }
        } = this.state
        const withHint = {
            hint: 'withHint'
        }
        return (
            <div className='signin-container'>
                <div className='signin-form'>
                    <div className='header-context'>
                        <img src={logo} alt="" />
                        <p>Living without an aim is like sailing without a compass. -- John Ruskin</p>
                    </div>
                    <Form
                        onSubmit={this.handleSubmit}
                        formErr={formMessage}>
                        <FormItem
                            className='JTform-group'
                            id='pwd'
                            hint={unError}
                            theme={withHint}
                        >
                            <Input
                                type='text'
                                id='uname'
                                className='inpt'
                                placeholder='username'
                                filedName={'user'}
                                onChange={this.handleOnChange}
                                value={user}
                                error={unError}
                            />
                        </FormItem>
                        <FormItem
                            className='JTform-group mb-1'
                            id='pwd'
                            hint={pwdError}
                            theme={withHint}
                        >
                            <Input
                                type='password'
                                id='pwd'
                                className='inpt'
                                placeholder='password'
                                filedName={'password'}
                                onChange={this.handleOnChange}
                                value={password}
                                error={pwdError}
                            />
                        </FormItem>

                        <FormItem
                            className='rememberUser'
                        >
                            <input id='checkUser' type="checkbox" />
                            <label htmlFor='checkUser'>自动登录</label>
                        </FormItem>

                        <button type='submit' className='JTbtn-block JTbtn-lg signin-submit JTbtn JTbtn-primary'>sign in</button>
                    </Form>
                    <div className='signin-fotter'>
                        Hello World!
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const { user } = state
    return {
        user
    }
}

export default connect(mapStateToProps, {
    loginAcion,
    navigate
})(Login) 
