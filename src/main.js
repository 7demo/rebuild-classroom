// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRsource from 'vue-resource';
import store from './vuex/store';
import VueRouter from 'vue-router';
import pomeloModule from 'pomeloModule'; //暴露给全局pomelo
// import fabric from 'fabric'; //暴露给全局pomelo
import onPomelo from './assets/onPomelo.js';


//组件
import App from './App';
import Teacher from './components/Role/Teacher.vue';
import Student from './components/Role/Student.vue';
import Consult from './components/Role/Consult.vue';
import Canvastpl from './components/Canvas/Canvas.vue';
import Tool from './components/Tool/Tool.vue';

import './assets/common.scss';
// console.log(fabric, pomeloModule)

Vue.use(VueRsource);
Vue.use(VueRouter);
Vue.use(onPomelo);
Vue.http.options.emulateJSON = true;

//路由
var router = new VueRouter({
	routes: [
	    {
	    	path: '/', 
	    	redirect: '/student' 
	    },
	    {
	    	path : '/teacher',
	    	component : Teacher
	    },
	    {
	    	path : '/student',
	    	component : Student
	    },
	    {
	    	path : '/consult',
	    	component : Consult
	    }
	]
});

/* eslint-disable no-new */
const app = new Vue({
	el : '#app',
  	store,
  	router,
  	mounted : () => {
  		
  	},
  	render: h => h(App)
})
