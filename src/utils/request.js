// 导入 axios 库，用于发送 HTTP 请求
import axios from 'axios';
// 导入 Element Plus 的 Loading 组件，用于显示加载动画
import {ElLoading} from 'element-plus';

// 导入配置文件，获取项目的基础 URL
import config from '../config';
// 导入路由实例，用于页面跳转
import router from '../router';
// 导入 token 状态管理模块，用于获取用户的 token
import useToken from '../stores/token';

// 导入通知工具函数，用于显示成功或错误提示
import notification from './notification';

// 从配置文件中获取基础 URL
const baseURL = config.baseURL;

// 定义一个变量，用于保存 Loading 实例
var loadingInstance = null;

// 创建 axios 实例，并设置基础 URL
const service = axios.create({baseURL});

// 请求拦截器：在请求发送之前执行
service.interceptors.request.use(config => {
  // 显示加载动画
  loadingInstance = ElLoading.service();
  // 从 token 状态管理中获取用户的 token
  const {token} = useToken();
  // 如果 token 存在，将其添加到请求头中
  if (token) {
    config.headers.jwt = token;
  }
  // 返回处理后的请求配置
  return config;
});

// 响应拦截器：在接收到响应后执行
service.interceptors.response.use(
    response => {
      // 关闭加载动画
      loadingInstance.close();
      // 从响应数据中解构出 errno（错误码）、data（返回数据）和
      // errmsg（错误信息）
      const {errno, data, errmsg} = response.data;
      // 如果 errno 为 0，表示请求成功
      if (errno === 0) {
        // 如果 errmsg 不为空，显示成功通知
        if (errmsg !== '') {
          notification({message: errmsg, type: 'success'});
        }
        // 返回响应数据，如果 data 为空则返回 true
        return data || true;
      }

      // 如果 errno 不为 0，显示错误通知
      notification({message: errmsg, type: 'error'});
      // 如果 errno 为 2，表示 token 无效或过期，跳转到登录页面
      if (errno === 2) {
        router.push({name: 'login'});
      }
      // 返回 false 表示请求失败
      return false;
    },
    error => {
      // 关闭加载动画
      loadingInstance.close();
      // 显示请求失败的通知
      notification({message: '请求失败', type: 'error'});
      // 在控制台打印错误信息
      console.log(error);
    });

// 导出 axios 实例
export default service;