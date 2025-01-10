<template>
	<!-- 外层卡片容器，用于包裹整个登录表单 -->
	<el-card class="box-card">
		<!-- 内层卡片容器，用于包裹表单内容 -->
		<el-card class="box-form">
			<!-- 卡片头部，显示系统标题 -->
			<template #header>
				<div class="card-header">
					<h3>“微商城”后台管理系统</h3>
				</div>
			</template>

			<!-- 表单部分，使用 Element Plus 的 el-form 组件 -->
			<el-form ref="ruleFormRef" status-icon :model="form" :rules="rules" label-width="120px">
				<!-- 用户名输入框 -->
				<el-form-item prop="username" label="用户名：">
					<el-input v-model="form.username" placeholder="请输入用户名" />
				</el-form-item>

				<!-- 密码输入框 -->
				<el-form-item prop="password" label="密 码：">
					<el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
				</el-form-item>

				<!-- 登录和重置按钮 -->
				<el-form-item>
					<el-button class="botton" @click="submitForm(ruleFormRef)" type="primary" size="large">登录</el-button>
					<el-button class="botton" @click="resetForm" type="info" size="large">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</el-card>
</template>

<script setup>
// 引入 Vue 的相关功能
import { ref, reactive } from 'vue'
// 引入登录接口
import { login } from '../api'
// 引入 Vue Router 用于页面跳转
import { useRouter } from 'vue-router'
// 引入 token 管理模块
import useToken from '../stores/token'
// 引入通知工具
import notification from '../utils/notification'

// 获取路由实例
const router = useRouter()
// 获取 token 管理模块中的更新 token 方法
const { updateToken } = useToken()

// 定义表单数据，使用 reactive 使其响应式
const form = reactive({
	username: '',
	password: ''
})

// 获取表单的引用，用于表单验证和重置
const ruleFormRef = ref()

// 表单提交函数
const submitForm = formEl => {
	// 表单验证
	formEl.validate(async valid => {
		if (valid) {
			// 如果表单验证通过，调用登录接口
			const data = await login(form)

			if (data) {
				// 如果登录成功，更新 token 并跳转到首页
				updateToken(data.token)
				router.push({ name: 'index' })
				console.log(1)
			}

		} else {
			// 如果表单验证失败，显示错误通知
			notification({
				message: '表单填写有误',
				type: 'error'
			})
		}
	})
}

// 表单重置函数
const resetForm = () => {
	ruleFormRef.value.resetFields()
}

// 表单验证规则
const rules = reactive({
	username: [
		{ required: true, message: '请输入用户名', trigger: 'blur' }, // 用户名必填
		{ min: 3, max: 12, message: '用户名长度为3~12个字符', trigger: 'blur' }, // 用户名长度限制
	],

	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' }, // 密码必填
		{ min: 6, max: 24, message: '密码长度为6~24个字符', trigger: 'blur' }, // 密码长度限制
	]
})
</script>

<style lang="scss" scoped>
/* 外层卡片样式 */
.box-card {
	height: 100%;
	background: rgba(38, 72, 176) url('/images/loginBg.jpg') center / cover no-repeat;

	/* 内层卡片样式 */
	.box-form {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 70%;
		max-width: 750px;
		transform: translate(-50%, -50%);

		/* 卡片头部样式 */
		.card-header {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		/* 表单样式 */
		.el-form {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			/* 表单项样式 */
			.el-form-item {
				width: 70%;
				display: flex;
				align-items: center;
				justify-content: center;
				--e1-form-label-font-size: 16px;
				margin-top: 15px;
				margin-bottom: 15px;

				/* 按钮样式 */
				.botton {
					width: 90px;
				}

				&.center {
					display: flex;
					justify-content: center;
				}
			}
		}
	}
}
</style>