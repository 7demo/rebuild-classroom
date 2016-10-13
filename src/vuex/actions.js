/**
 * action操作
 * @type {Object}
 */
const actions = {

	//鼠标按钮开始会绘制
	startDraw ({commit}, data) {
		commit('DRAW_START', data)
	},
	//进行绘制
	runDraw ({commit}, data) {
		commit('RUN_DRAW', data)
	},
	//结束绘制
	finshDraw ({commit}, data) {
		commit('FINISH_DRAW', data)
	},

	//缓存画板上下文对象
	setCanvasContext ({commit}, data) {
		commit('SET_CANVAS_CONTEXT', data)
	},

	//标记是否绘制
	setCanvasIsDraw ({commit}, data) {
		commit('SET_IS_DRAW', data)
	},

	//设置pomelo的信息
	setPomeloServerAddress ({commit}, data) {
		commit('SET_POMELO_SERVER_ADDRESS', data);
	}, 

	//设置房间信息
	setRoominfo ({commit}, data) {
		commit('SET_ROOMINFO', data);
	},

	//设置用户信息
	setUserinfo ({commit}, data) {
		commit('SET_USERINFO', data);
	},

	//设置全部用户
	setUsers ({commit}, data) {
		commit('SET_USERS', data);
	},

	//設置全部用戶order問題
	setUsersOrder ({commit}, data) {
		commit('SET_USERS_ORDER', data);
	}

}
export default actions