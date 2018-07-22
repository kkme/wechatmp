<template>
	<v-app light>
		<v-toolbar flat fixed app dense :clipped-left="clipped">
			<v-btn icon @click.stop="clipped = !clipped">
				<v-icon class="iconfont icon-left"></v-icon>
			</v-btn>
			<div v-text="title"></div>
		</v-toolbar>
		<v-content>
			<v-container class="pa-0">
				<nuxt />
			</v-container>
		</v-content>

		<bottom-nav></bottom-nav>
	</v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav'
export default {
  components: {
    BottomNav
  },
  data() {
    return {
      clipped: true,
      title: '懒虫动动兼职平台',
      bottomNav: 'center'
    }
  }
}
</script>
