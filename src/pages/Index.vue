<template>
	<div class="common-layout">
		<!-- 使用 Element Plus 的布局容器 -->
		<el-container>
			<!-- 头部区域 -->
			<el-header>
				<!-- 引入 Header 组件 -->
				<Header></Header>
			</el-header>
			<!-- 主体区域 -->
			<el-container>
				<!-- 侧边栏区域 -->
				<el-aside>
					<!-- 引入 Aside 组件 -->
					<Aside></Aside>
				</el-aside>
				<!-- 主内容区域 -->
				<el-main>
					<!-- 使用卡片包裹路由视图 -->
					<el-card class="box-card">
						<!-- 路由视图，用于渲染子路由组件 -->
						<router-view></router-view>
					</el-card>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup>
// 导入 Header 组件
import Header from '../components/Header.vue'
// 导入 Aside 组件
import Aside from '../components/Aside.vue'
</script>


<style lang="scss" scoped>
.el-container {
	height: 100%;
	
	.el-header {
		background: -webkit-gradient(linear, left top, right top, from(#1493fa), to(#01c6fa));
		text-align: center;
		line-height: 60px;
		color: #333;
	}

	.el-aside {
		width: 200px;
		height: 100%;
		color: #333;
		background: white;
	}

	.el-main {
		height: 100vh;
		background-color: #e9eef3;
		color: #333;
	}
}

</style>