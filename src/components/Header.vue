<template>
	<div></div>
	<!-- 使用 Element Plus 的菜单组件，设置为水平模式 -->
	<el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
		<!-- 系统名称 -->
		<div class="navbar">“微商城”后台管理系统</div>
		<!-- 用户信息下拉菜单 -->
		<el-sub-menu class="menu" index="1">
			<template #title>
				<!-- 用户头像和用户名 -->
				<el-avatar class="avatar" :src="admin.avatar"> {{ admin.username }}</el-avatar>
			</template>
			<!-- 个人中心菜单项 -->
			<router-link :to="{ name: 'setting' }">
				<el-menu-item index="5">个人中心</el-menu-item>
			</router-link>
			<!-- 退出登录菜单项 -->
			<el-menu-item index="6" @click="onLogout">退出登录</el-menu-item>
		</el-sub-menu>
	</el-menu>
</template>

<script setup>
// 导入管理员状态管理
import useAdmin from '../stores/admin'
// 导入路由实例
import router from '../router'
// 导入 token 状态管理
import useToken from '../stores/token'
// 导入通知工具函数
import notification from '../utils/notification'
// 导入 Vue 生命周期函数
import { onMounted } from 'vue'
// 导入获取管理员信息的接口
import { getAdmin } from '../api'

// 从 token 状态管理中解构出 removeToken 方法
const { removeToken } = useToken()
// 从管理员状态管理中解构出 admin 数据、updateAdmin 和 removeAdmin 方法
const { admin, updateAdmin, removeAdmin } = useAdmin()

// 组件挂载时加载管理员信息
onMounted(() => {
	loadAdmin()
})

// 加载管理员信息
const loadAdmin = async () => {
	// 调用接口获取管理员信息
	let data = await getAdmin()
	// 更新管理员状态
	updateAdmin({
		username: data.username, // 用户名
		avatar: data.avatar // 头像
	})
}

// 退出登录
const onLogout = async () => {
	// 清除 token
	removeToken()
	// 清除管理员信息
	removeAdmin()
	// 跳转到登录页面
	router.push({ name: 'login' })
	// 显示退出成功的通知
	notification({
		message: '退出成功',
		type: 'success'
	})
}
</script>

<style lang="scss" scoped>
.el-menu-demo {
	background: linear-gradient(90deg, #1493fa, #01c6fa);
}

.navbar {
	color: white;
	font-size: 20px;
}

.menu {
	margin-left: auto;
}
</style>