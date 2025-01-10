<template>
	<!-- 修改语言为中文 -->
	<el-config-provider :locale="zhCN">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup>
import { zhCn } from 'element-plus/lib/locale/lang/zh-cn';
</script>