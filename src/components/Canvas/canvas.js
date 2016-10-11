/**
 * canvas相关处理
 */

/**
 * canvas dom元素获取context上下文对象
 * [self] 组件对象
 * @return {[type]} [description]
 */
export const domToCanvas = (self) => {
	
	let canvasDomArray = self.$el.children[0].children;
	let canvasArray = [];
	canvasDomArray = Array.prototype.slice.call(canvasDomArray);
	for (let i of canvasDomArray) {
		canvasArray.push(i.getContext('2d'));
	}
	return canvasArray;

}

/**
 * 影层自由绘
 * canvas : 绘制图层上下文的context
 * data : 绘制数据
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const shadowFreeDraw = (data) => {

	let _canvas = data.canvas;
	let _data = data.data;
	if (!_canvas || !_data.length) return;
	
	_canvas.save();
	_canvas.fillStyle = 'black';
	_canvas.lineCap = "round";
	_canvas.lineJoin = "round";
	_canvas.lineWidth = 2;
	_canvas.strokeStyle = 'black';
	_canvas.clearRect(0, 0, 700,500);
	_canvas.beginPath();
	if (_data.length < 3) {
		_canvas.arc(_data[0][0], _data[0][1], 2, 0, Math.PI * 2, !0);
		_canvas.fill();
		_canvas.closePath();
	} else {
		_canvas.moveTo(_data[0][0], _data[0][1]);
		for (var i = 1; i < _data.length - 2; i++) {
	        var c = (_data[i][0] + _data[i + 1][0]) / 2;
	        var d = (_data[i][1] + _data[i + 1][1]) / 2;
	        _canvas.quadraticCurveTo(_data[i][0], _data[i][1], c, d);				
		}
 		_canvas.stroke();
	}
	_canvas.restore();

}

/**
 * 影层自由绘层下沉
 * shadow 影层
 * write 写入层
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const shadowToCanvas = (data) => {
	data.write.drawImage(data.canvas, 0, 0);
}

