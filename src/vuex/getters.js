/**
 * getters 
 */

const getters = {
	//画笔数据
	getDrawData : (state) => {
		return state.draw;
	},

	//获得房间信息
	getRoomData : (state) => {
		return state.room;
	},

	//获取画板你请客
	getCanvasData : (state) => {
		return state.canvas;
	},

	//获取pomelo相关信息
	getPomeloData : (state) => {
		return state.pomelo;
	},

	//获取用户信息
	getUserData : (state) => {
		return state.user;
	},

	//獲取所有用戶信息及自己位置關係
	getUsersData : (state) => {
		return state.users
	}
}

export default getters