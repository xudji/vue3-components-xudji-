import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 5. 创建并挂载根实例
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn' //中文
import { createPinia } from 'pinia'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
app.use(createPinia())
app.use(ElementPlus, { locale })
app.mount('#app')



