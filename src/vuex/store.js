import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
 
Vue.use(Vuex);

const state = {

	//房间相关信息
	room : {
		type : 2 //房间类型
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
	draw : {
		isDraw : false,
		flag : false,
		data : []
	}
}

const mutations = {
	//鼠标按下开始绘制
	DRAW_START (state) {
		state.draw = {
			flag : true,
			data : []
		}
	},
	//鼠标按下后移动
	RUN_START (state, data) {
		if (state.draw.flag) {
			state.draw.data.push(data);
		}
	},
	//绘制结束
	FINISH_START (state) {
		state.draw.flag = false;
	},

	//缓存canvas的上下文对象 
	//上下文对象，索引值，默认为当前索引
	SET_CANVAS_CONTEXT (state, data) {
		state.canvas.context[data.index || state.canvas.index] = data.context;
	}, 

	//标记是否在绘制状态
	SET_IS_DRAW (state, data) {
		state.draw.isDraw = data.flag;
	}
}


export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})