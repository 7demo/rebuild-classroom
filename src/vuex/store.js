import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
 
Vue.use(Vuex);

const state = {

	//房间相关信息
	room : {
		type : 2, //房间类型,
		courseId  : undefined, //房间号
		server : undefined, //服务器类型
		client : undefined //访问客户端
	},

	//pomelo相关信息
	pomelo : {
		host : undefined,
		port : undefined,
		roomId : undefined
	},

	//画板相关信息
	canvas : {
		total : 1, //共多少面画板
		index : 0, //当前画板索引,
		style : { //画板样式

		},
		context : {} //存放上下文对象 array
	},

	//绘制相关数据
	draw : [],
	// isDraw : false, //当前是否15s后的可画
	// 	flag : false,//鼠标是否按下
	// 	data : {}

	//用户信息
	user : {
		uid : undefined,
		name : undefined,
		role : undefined
	},

	//所有用户信息
	users : {
		users : [],
		order : { //對應的順序
			
		}
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})