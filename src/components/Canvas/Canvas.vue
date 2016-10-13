<template>
	<div id='canvasWrap' class="canvas-wrap" :value='shadowDraw' v-on:mousedown='startDraw' v-on:mousemove='runDraw' v-on:mouseup='finishDraw'>
		
		<div class='canvas' v-for="page in canvas.total"  v-bind:class='{active:page === canvas.index + 1}'>
			<canvas width='1000' height='500' class="canvas-write"></canvas>
			<canvas width='1000' height='500' v-for="layer in rooms.type" :class="['canvas-shadow-' + layer]"></canvas>
		</div>

	</div>
</template>

<style lang='scss'>
	@import './canvas.scss';
</style>

<script>

	import {domToCanvas, shadowFreeDraw, shadowToCanvas} from './canvas.js';
	import {sendPomeloData} from '../../assets/pomeloHandler.js';
	export default {

		//组建安装完成
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
					_usersData = this.$store.getters.getUsersData,
					_canvasData = this.$store.getters.getCanvasData;
				let self = this;
				if (!_canvasData.context[0]) return; //排除初始化的情况

				for (let i = 0; i < _drawData.length; i++) {
					if (_drawData[i].data.length) { //若绘制的时候
						shadowFreeDraw({ //绘制阴影层
							canvas : _canvasData.context[0][_usersData.order[_drawData[i].uid]],
							data : _drawData[i].data
						})
					} else {
						if (_drawData[i].uid) {
							shadowToCanvas({
								canvas : self.$el.children[0].children[_usersData.order[_drawData[i].uid]],
								write : _canvasData.context[0][2]
							});
						}
						
					}
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
				this.$store.dispatch('startDraw', {
					uid : this.$store.getters.getUserData.uid,
				})
				sendPomeloData({
					type : 'drawFlag',
					uid : this.$store.getters.getUserData.uid,
					data : {
						mouse : 'down'
					}
				})
			},
			//绘制中，分发数据 
			runDraw (e) {
				
				let self = this;
				let _drawData = self.$store.getters.getDrawData;
				let _userData = self.$store.getters.getUserData;
				let _usersData = self.$store.getters.getUsersData;
				let _curData = _drawData[_usersData.order[_userData.uid]];
				if (_curData && _curData.flag && !_curData.isDraw) {
					self.$store.dispatch('setCanvasIsDraw', {
						flag : true,
						uid : self.$store.getters.getUserData.uid
					})
					this.$store.dispatch('runDraw', {
						uid : self.$store.getters.getUserData.uid,
						x : e.offsetX,
						y : e.offsetY
					})

					sendPomeloData({
						type : 'draw',
						uid : this.$store.getters.getUserData.uid,
						data : {
							x : e.offsetX,
							y : e.offsetY
						}
					})
					setTimeout(function () {
						self.$store.dispatch('setCanvasIsDraw', {
							flag : false,
							uid : self.$store.getters.getUserData.uid
						})
					}, 15)
				}
				
			},
			//结束绘制
			finishDraw () {
				this.$store.dispatch('finshDraw', {
					uid : this.$store.getters.getUserData.uid,
				});
				sendPomeloData({
					type : 'drawFlag',
					uid : this.$store.getters.getUserData.uid,
					data : {
						mouse : 'up'
					}
				})
			}
		}
		

	}

</script>