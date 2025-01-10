// 导入 request 模块，用于发送 HTTP 请求
import request from '../utils/request'
// 导入 config 模块，用于获取项目配置（如基础 URL）
import config from '../config'

// 登录接口
// 功能：发送登录请求，传递用户登录数据（如用户名和密码）
export function login(data) {
    return request.post('/admin/login', data) // 使用 POST 方法发送请求到 /admin/login 接口
}

// 用户信息接口
// 功能：获取当前管理员用户的信息
export function getAdmin() {
    return request.get('/admin/admin') // 使用 GET 方法发送请求到 /admin/admin 接口
}

// 修改密码接口
// 功能：发送修改密码请求，传递新密码数据
export function changeAdminPassword(data) {
    return request.post('/admin/admin/changePassword', data) // 使用 POST 方法发送请求到 /admin/admin/changePassword 接口
}

// 修改头像接口
// 功能：发送修改头像请求，传递新头像数据
export function changeAdminAvatar(data) {
    return request.post('/admin/admin/changeAvatar', data) // 使用 POST 方法发送请求到 /admin/admin/changeAvatar 接口
}

// 获取图片上传地址
// 功能：返回图片上传的完整 URL 地址
export function uploadPictureURL() {
    return config.baseURL + '/admin/upload/picture' // 拼接基础 URL 和图片上传路径
}