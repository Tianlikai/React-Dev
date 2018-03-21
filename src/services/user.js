import request from '../utils/request'

let LOGIN_URL = './static/mock/login.json'
// let testUrl = 'http://192.168.37.72:9988/lae/auth/login'

export async function singin(params) {
    return request(LOGIN_URL)
}



