import Vue from 'vue';
const mutations = {
	//鼠标按下开始绘制
	DRAW_START (state, data) {
		Vue.set(state.draw, state.users.order[data.uid], {
			flag : true,
			isDraw : false,
			data : [],
			uid : data.uid
		});
	},
	//鼠标按下后移动
	RUN_DRAW (state, data) {
		let _index = state.users.order[data.uid];
		if (state.draw[_index].flag) {
			if (!state.draw[_index].uid) {
			 	state.draw[_index].uid = data.uid;
			}
			state.draw[_index].data.push([data.x, data.y]);
		}
	},
	//绘制结束
	FINISH_DRAW (state, data) {
		state.draw[state.users.order[data.uid]].flag = false;
	},

	//缓存canvas的上下文对象 
	//上下文对象，索引值，默认为当前索引
	SET_CANVAS_CONTEXT (state, data) {
		state.canvas.context[data.index || state.canvas.index] = data.context;
	}, 

	//标记是否在绘制状态
	SET_IS_DRAW (state, data) {
		state.draw[state.users.order[data.uid]].isDraw = data.flag;
	},

	//设置pomelo服务器信息
	SET_POMELO_SERVER_ADDRESS (state, data) {
		state.pomelo.host = data.host || state.pomelo.host;
		state.pomelo.port = data.port || state.pomelo.port;
		state.pomelo.roomId = data.roomId || state.pomelo.roomId;
	},

	//设置房间类型等信息与初始化画板数据的长度
	SET_ROOMINFO (state, data) {
		Object.keys(data).map((i,v) => {
			state.room[i] = data[i];
		})
		state.room.type = Number(state.room.type);
		for (let i = 0 ; i < state.room.type; i++) {
			state.draw[i] = {
				flag : false,
				isDraw : false,
				data : [],
				uid : undefined
			}
		}
	},

	//设置用户信息
	SET_USERINFO (state, data) {
		Object.keys(data).map((i,v) => {
			state.user[i] = data[i];
		})
	},

	//设置所有用户信息
	SET_USERS (state, data) {
		state.users.users = data;
	},

	//設置用戶所在對應的圖層順序，add代表增加，remove代表刪除
	SET_USERS_ORDER (state, data) {
		if (data.type == 'add') { //增加
			
			//已存在的時候跳出
			if (state.users.order[data.uid] > -1) return;

			//用戶自己，排第一個
			if (data.uid === state.user.uid) { 
				state.users.order[data.uid] = 0;
			} else {
				let _tpmIndex = 0;
				Object.keys(state.users.order).map((i, v) => {
					if (state.users.order[i] > _tpmIndex + 1) { //中間有差數字,也就是有刪除的時候停止
						_tpmIndex ++;
						return;
					} else {
						_tpmIndex ++;
					}
				})
				state.users.order[data.uid] = _tpmIndex;

			}
		} else if (data.type == 'remove') { //減少
			Object.keys(state.users.order).map((i, v) => {
				if (i== data.uid) {
					delete state.users.order[i];
				}
			})
		}
	}
}

export default mutations;