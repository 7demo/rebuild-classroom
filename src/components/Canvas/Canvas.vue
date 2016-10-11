<template>
	<div id='canvasWrap' class="canvas-wrap" :value='shadowDraw' v-on:mousedown='startDraw' v-on:mousemove='runDraw' v-on:mouseup='finishDraw'>
		
		<div class='canvas' v-for="page in canvas.total"  v-bind:class='{active:page === canvas.index + 1}'>
			<canvas width='700' height='500' class="canvas-write"></canvas>
			<canvas width='700' height='500' v-for="layer in rooms.type" :class="['canvas-shadow-' + layer]"></canvas>
		</div>

	</div>
</template>

<style lang='scss'>
	@import './canvas.scss';
</style>

<script>

	import {domToCanvas, shadowFreeDraw, shadowToCanvas} from './canvas.js';
	
	export default {

		//程序安装完成
		mounted () { 

			let roomInfo = this.$store.getters.getRoomData;
			let self = this;
			//缓存canvas上下文
			this.$store.dispatch('setCanvasContext', {
				context : domToCanvas(self)
			});

		},
		computed : {
			
			//在模板中必须绑定，以触发数据
			shadowDraw () {
				let _drawData = this.$store.getters.getDrawData,
					_canvasData = this.$store.getters.getCanvasData;
				let self = this;

				if (!_canvasData.context[0]) return; //排除初始化的情况
				if (_drawData.data.length) { //若绘制的时候
					shadowFreeDraw({ //绘制阴影层
						canvas : _canvasData.context[_canvasData.index][0],
						data : _drawData.data
					})
				} else {
					shadowToCanvas({
						canvas : self.$el.children[0].children[0],
						write : _canvasData.context[_canvasData.index][1]
					});
				}
				
				return '';
			},

			//画板
			canvas () {
				return this.$store.getters.getCanvasData;
			},

			//教室数据
			rooms () {
				return this.$store.getters.getRoomData;
			}
			

		},
		methods : {
			//开始绘制
			startDraw (e) {
				this.$store.dispatch('startDraw')
			},
			//绘制中，分发数据
			runDraw (e) {
				
				let self = this;
				let _drawData = self.$store.getters.getDrawData;
				if (!_drawData.isDraw) {
					
					self.$store.dispatch('setCanvasIsDraw', {
						flag : true
					})
					this.$store.dispatch('runDraw', [e.offsetX, e.offsetY])
					setTimeout(function () {
						self.$store.dispatch('setCanvasIsDraw', {
							flag : false
						})
					}, 15)
				}
				
			},
			//结束绘制
			finishDraw () {
				this.$store.dispatch('finshDraw');
			}
		}
		

	}

</script>