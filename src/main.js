// 入口文件
import Vue from 'vue';

// 导入 mui 组件
import './lib/mui/dist/css/mui.css'

// 按需导入 Mint-ui 的组件
import { Header} from 'mint-ui'
Vue.component(Header.name,Header)

// 导入app组件
import app from './App.vue'



var vm = new Vue({
    el:'#app',
    render:c=> c(app)  // APP组件引用
})