/**
 * action操作
 * @type {Object}
 */
const actions = {

	//鼠标按钮开始会绘制
	startDraw ({commit}) {
		commit('DRAW_START')
	},
	//进行绘制
	runDraw ({commit}, data) {
		commit('RUN_START', data)
	},
	//结束绘制
	finshDraw ({commit}) {
		commit('FINISH_START')
	},

	//缓存画板上下文对象
	setCanvasContext ({commit}, data) {
		commit('SET_CANVAS_CONTEXT', data)
	},

	//标记是否绘制
	setCanvasIsDraw ({commit}, data) {
		commit('SET_IS_DRAW', data)
	}
}
export default actions