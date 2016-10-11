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
	}
}

export default getters