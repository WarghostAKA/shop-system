<script setup>
// 导入 Vue 相关函数
import { ref, reactive } from 'vue'
// 导入默认头像图片
import defaultAvatarURL from '/images/avatar-default.png'
// 导入 API 接口
import { changeAdminPassword, uploadPictureURL, changeAdminAvatar } from '../../api';
// 导入 token 状态管理
import useToken from '../../stores/token'
// 导入管理员状态管理
import useAdmin from '../../stores/admin'
// 导入路由实例
import router from '../../router'
// 导入通知工具函数
import notification from '../../utils/notification'

// 从管理员状态管理中解构出 admin 数据、updateAdmin 和 removeAdmin 方法
const { admin, updateAdmin, removeAdmin } = useAdmin()
// 从 token 状态管理中解构出 token 和 removeToken 方法
const { token, removeToken } = useToken()
// 设置请求头，包含 token
const headers = { jwt: token }

// 获取图片上传地址
const uploadURL = uploadPictureURL()
// 设置上传数据
const uploadData = { type: 'admin_avatar' }

// 表单数据
const form = reactive({
	password: '', // 新密码
	password2: '' // 确认密码
})

// 头像 URL，默认为管理员头像或默认头像
const avatarURL = ref(admin.avatar || defaultAvatarURL)
// 表单引用
const ruleFormRef = ref()
// 上传组件引用
const uploadRef = ref()

// 修改密码
const submitForm = formEl => {
	formEl.validate(async valid => {
		if (valid) {
			// 表单验证通过，调用修改密码接口
			await changeAdminPassword({ password: form.password })
			resetForm() // 重置表单

			// 退出登录
			removeToken() // 清除 token
			removeAdmin() // 清除管理员信息
			router.push({ name: 'login' }) // 跳转到登录页面
			notification({
				message: '修改密码后，请重新登录',
				type: 'warning' // 显示警告通知
			})
		} else {
			// 表单验证失败，显示错误通知
			notification({
				message: '表单填写有误',
				type: 'error'
			})
		}
	})
}

// 重置表单
const resetForm = () => {
	ruleFormRef.value.resetFields();
}

// 提交上传
const submitUpload = () => {
	uploadRef.value.submit() // 手动触发上传
}

// 上传成功回调
const uploadSuccess = async response => {
	const { errno, errmsg, data } = response
	if (errno !== 0) {
		// 上传失败，显示错误通知
		notification({
			message: errmsg,
			type: 'error'
		})
	} else {
		// 上传成功
		if (errmsg !== '') {
			notification({
				messaeg: errmsg,
				type: 'success' // 显示成功通知
			})
		}

		// 调用接口更新管理员头像
		await changeAdminAvatar({
			avatar: data.savepath
		})

		// 更新管理员状态
		updateAdmin({
			avatar: data.url
		})

		// 更新头像 URL
		avatarURL.value = data.url
	}

	// 清空上传文件列表
	uploadRef.value.clearFiles()
}

// 验证两次密码是否一致
const validatePass = (rule, value, callback) => {
	if (value !== form.password) {
		callback(new Error('两次输入密码不一致！'))
	} else {
		callback()
	}
}

// 表单验证规则
const rules = reactive({
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' }, // 密码必填
		{ min: 6, max: 24, message: '密码长度为6~24个字符', trigger: 'blur' }, // 密码长度限制
	],
	password2: [
		{ required: true, message: '请输入密码', trigger: 'blur' }, // 确认密码必填
		{ validator: validatePass, trigger: 'blur' } // 自定义验证规则
	]
})
</script>

<template>
	<!-- 布局容器 -->
	<el-row :gutter="20">
		<!-- 左侧：头像信息 -->
		<el-col :span="8">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">头像信息</div>
				</template>
				<!-- 头像和上传组件 -->
				<div class="text item">
					<div class="avatar">
						<el-avatar class="avatar" shape="square" :size="50" :src="avatarURL" />
					</div>
					<el-upload
						ref="uploadRef"
						class="upload-demo"
						:limit="1"
						:action="uploadURL"
						:headers="headers"
						:data="uploadData"
						:auto-upload="false"
						:on-success="uploadSuccess">
						<!-- 触发上传的按钮 -->
						<template #trigger>
							<p><el-button type="primary">选择头像</el-button></p>
						</template>
						<!-- 手动上传按钮 -->
						<div>
							<el-button type="success" @click="submitUpload">上传头像</el-button>
						</div>
						<!-- 上传提示 -->
						<template #tip>
							<div class="el-upload__tip"><p>限制上传1个文件，且旧文件会被新文件覆盖</p></div>
						</template>
					</el-upload>
				</div>
			</el-card>
		</el-col>

		<!-- 右侧：修改密码 -->
		<el-col :span="16">
			<el-card class="box-card">
				<template #header>个人信息</template>
				<!-- 修改密码表单 -->
				<div class="change-password-box">
					<el-form ref="ruleFormRef" status-icon :model="form" :rules="rules" label-width="140px">
						<!-- 新密码输入框 -->
						<el-form-item prop="password" label="修改密码">
							<el-input type="password" v-model="form.password" />
						</el-form-item>
						<!-- 确认密码输入框 -->
						<el-form-item prop="password2" label="请再次输入密码">
							<el-input type="password" v-model="form.password2" />
						</el-form-item>
						<!-- 提交和重置按钮 -->
						<el-form-item>
							<el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
							<el-button @click="resetForm">重置</el-button>
						</el-form-item>
					</el-form>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>


<style lang="scss" scoped>
.avatar {
	text-align: center;
}

.upload-demo {
	text-align: center;
}

.box-card {
	height: 316px;
}

.change-password-box {
	padding-top: 38px;
}
</style>