import request from '../utils/request'
import config from '../config'

//登录接口
export function login(data) {
	return request.post('/admin/login' ,data)
}

// 用户信息接口
export function getAdmin() {
        return request.get('/admin/admin')
}


