<script setup>
// 导入 Vue 相关函数
import { reactive, onMounted } from 'vue';
// 导入获取管理员信息的接口
import { getAdmin } from '../../api';
// 导入管理员状态管理
import useAdmin from '../../stores/admin';
// 导入 Element Plus 图标组件
import { Memo } from '@element-plus/icons-vue'
// 导入 ECharts 库
import * as echarts from 'echarts'

// 从管理员状态管理中解构出 admin 数据和 updateAdmin 方法
const { admin, updateAdmin } = useAdmin()

// 组件挂载时执行
onMounted(() => {
	loadAdmin() // 加载管理员信息
	initCharts1() // 初始化图表1（月度销售额）
	initCharts2() // 初始化图表2（订单数量）
})

// 加载管理员信息
const loadAdmin = async () => {
	let data = await getAdmin()
	updateAdmin({
		username: data.username, // 更新用户名
		avatar: data.avatar // 更新头像
	})
}

// 用户登录信息
const loginInfo = reactive({
	loginTime: '2023-07-22 09:00:00', // 登录时间
	loginPlace: '北京' // 登录地点
})

// 图表1：月度销售额
const initCharts1 = () => {
	// 初始化 ECharts 实例
	const myChart = echarts.init(document.getElementById('salesVolume'))
	// 设置图表配置项
	myChart.setOption({
		color: ['#1493fa'], // 图表颜色
		title: { text: '2022年度销售额' }, // 图表标题
		xAxis: {
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], // X 轴数据
			name: '月份', // X 轴名称
			axisLabel: {
				intercal: 0 // 刻度标签间隔
			},
		},
		yAxis: {
			name: '单位（千万元）', // Y 轴名称
		},
		grid: {
			left: '3%', // 图表左边距
			right: '8%', // 图表右边距
			bottom: '5%', // 图表底边距
			containLabel: true, // 包含坐标轴标签
		},
		legend: {}, // 图例
		series: [
			{
				data: [6, 7, 8.5, 8, 9, 10, 13, 12, 10, 16, 15, 14], // 数据
				type: 'line', // 图表类型（折线图）
				name: '销售额', // 系列名称
				smooth: true, // 平滑曲线
				label: {
					show: true, // 显示数据标签
					position: 'top', // 标签位置
				}
			}
		]
	})

	// 图表自适应窗口大小
	window.onresize = () => {
		myChart.resize()
	}
}

// 图表2：2022年订单数量
const initCharts2 = () => {
	// 初始化 ECharts 实例
	const myChart = echarts.init(document.getElementById('orderQuantity'))
	// 设置图表配置项
	myChart.setOption({
		title: { text: '2022年订单数量' }, // 图表标题
		color: ['#1493fa'], // 图表颜色
		grid: {
			left: '3%', // 图表左边距
			right: '8%', // 图表右边距
			bottom: '3%', // 图表底边距
			containLabel: true, // 包含坐标轴标签
		},
		xAxis: {
			type: 'category', // 类目轴
			data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], // X 轴数据
			name: '月份', // X 轴名称
			axisTick: {
				alignWithLabel: true, // 刻度线与标签对齐
			},
			axisLabel: {
				interval: 0, // 刻度标签间隔
				rotate: 45 // 刻度标签旋转角度
			},
		},
		legend: {}, // 图例
		yAxis: {
			name: '单位（个）', // Y 轴名称
		},
		series: [
			{
				data: [400, 450, 300, 230, 250, 300, 400, 350, 160, 350, 380, 400], // 数据
				type: 'bar', // 图表类型（柱状图）
				barWidth: '60%', // 柱状图宽度
				name: '订单总数', // 系列名称
				label: {
					show: true, // 显示数据标签
					position: 'top', // 标签位置
				}
			}
		]
	})

	// 图表自适应窗口大小
	window.onresize = () => {
		myChart.resize()
	}
}
</script>

<template>
	<!-- 第一行：用户信息和统计信息 -->
	<el-row :gutter="20">
		<!-- 用户信息卡片 -->
		<el-col :span="6">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<!-- 用户头像 -->
						<el-avatar class="avatar" :src="admin.avatar" shape="square" :size="40"></el-avatar>
						<!-- 用户名 -->
						<span style="font-size: 24px;">{{ admin.username }}</span>
					</div>
				</template>
				<!-- 登录信息 -->
				<div class="info">
					<p>登录时间：{{ loginInfo.loginTime }}</p>
					<p>登陆地点：{{ loginInfo.loginPlace }}</p>
				</div>
			</el-card>
		</el-col>

		<!-- 单月统计信息卡片 -->
		<el-col :span="18">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						6月统计信息
					</div>
				</template>
				<!-- 统计信息 -->
				<div class="info">
					<el-row :gutter="24">
						<!-- 商品数量 -->
						<el-col :span="8">
							<div class="card-container">
								<div class="card-left-container" style="background-color :#EEAD0E;">
									<el-icon :size="90">
										<Memo />
									</el-icon>
								</div>
								<div class="card-right-container">
									<p class="number">500</p>
									<p>商品数量（个）</p>
								</div>
							</div>
						</el-col>

						<!-- 商品分类数量 -->
						<el-col :span="8">
							<div class="card-container">
								<div class="card-left-container" style="background-color: #AB82FF;">
									<el-icon :size="90">
										<Memo />
									</el-icon>
								</div>
								<div class="card-right-container">
									<p class="number">20</p>
									<p>商品分类数量（个）</p>
								</div>
							</div>
						</el-col>

						<!-- 用户访问次数 -->
						<el-col :span="8">
							<div class="card-container">
								<div class="card-left-container" style="background-color: #63B8FF;">
									<el-icon :size="90">
										<Memo />
									</el-icon>
								</div>
								<div class="card-right-container">
									<p class="number">121</p>
									<p>用户访问次数（次）</p>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-card>
		</el-col>
	</el-row>

	<!-- 第二行：图表区域 -->
	<el-row :gutter="20">
		<!-- 月度销售额折线图 -->
		<el-col :span="12">
			<el-card class="box-card">
				<div id="salesVolume" style="width: auto; height: 400px;"></div>
			</el-card>
		</el-col>

		<!-- 订单数量柱状图 -->
		<el-col :span="12">
			<el-card class="box-card">
				<div id="orderQuantity" style="width: auto; height: 400px;"></div>
			</el-card>
		</el-col>
	</el-row>
</template>

<style lang="scss" scoped>
.el-row {
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}

	.el-col {
		.box-card {
			.card-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.info {
				font-size: 14px;
			}
		}
	}
}

.card-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #e4e7ed;
	text-align: center;
	padding-right: 20px;
	.card-left-container {
		color: white;
	}

	.card-right-container {
		.number{
			font-size: 18px;
			font-weight: bold;
		}
	}
}
</style>