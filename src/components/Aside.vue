<script setup lang="ts">
// 导入 Element Plus 图标组件
import { HomeFilled, Setting, List } from '@element-plus/icons-vue'
// 导入 Vue 的 ref 函数
import { ref } from 'vue'
// 导入路由实例
import router from '../router'

// 定义菜单项的索引映射
const menuIndex = {
	'index': '1',    // 首页
	'category': '2', // 分类管理
	'goods': '3',    // 商品管理
	'setting': '4',  // 个人中心
}

// 根据当前路由名称设置默认激活的菜单项
const active = ref(menuIndex[router.currentRoute.value.name] || '0')
</script>

<template>
	<el-row>
		<el-col :span="24">
			<!-- 垂直菜单 -->
			<el-menu active-text-color="#white" class="el-menu-vertical-demo" :default-active="active" text-color="#333">
				<!-- 首页菜单项 -->
				<router-link :to="{ name: 'index' }">
					<el-menu-item index="1">
						<el-icon>
							<HomeFilled />
						</el-icon>
						<span>首页</span>
					</el-menu-item>
				</router-link>

				<!-- 分类管理菜单项 -->
				<router-link :to="{ name: 'category' }">
					<el-menu-item index="2">
						<el-icon>
							<List />
						</el-icon>
						<span>分类管理</span>
					</el-menu-item>
				</router-link>

				<!-- 商品管理菜单项 -->
				<router-link :to="{ name: 'goods' }">
					<el-menu-item index="3">
						<el-icon>
							<List />
						</el-icon>
						<span>商品管理</span>
					</el-menu-item>
				</router-link>

				<!-- 个人中心菜单项 -->
				<router-link :to="{ name: 'setting' }">
					<el-menu-item index="4">
						<el-icon>
							<Setting />
						</el-icon>
						<span>个人中心</span>
					</el-menu-item>
				</router-link>
			</el-menu>
		</el-col>
	</el-row>
</template>

<style lang="scss" scoped>
.el-menu {
	border: 0 !important;

	.is-active {
		background: linear-gradient(90deg, #1493fa, #01c6fa) !important
	}

	a{
		text-decoration: none;
		color: white;
	}
}
</style>