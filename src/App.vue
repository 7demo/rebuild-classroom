<template>
	<div id='app'>
	    <router-view></router-view>
	</div>
</template>

<script>

	import config from './assets/config.js';
	import {pomeloRequet} from './assets/pomeloHandler.js';

	export default {

		mounted () {

			/**
			 * 解析参数
			 */
			this.$store.dispatch('setRoominfo', {
				type : this.$route.query.type,
				courseId : this.$route.query.courseId,
				server : this.$route.query.server,
				client : this.$route.query.client
			});
			this.$store.dispatch('setUserinfo', {
				uid : this.$route.query.uid,
				name : this.$route.query.name,
				role : this.$route.query.role
			});
			this.$store.dispatch('setUsersOrder', {
				uid : this.$route.query.uid,
				type : 'add'
			})
			
			/**
			 * 链接服务器
			 */
	  		this.$http.post(config.url + '/api/course/load', { //获取pomelo的ip与地址
	  			courseId : this.$store.getters.getRoomData.courseId
	  		}).then(function (data) { 
	  			if (data.body.code == 200) {
	  				var _data = {
	  					host : data.body.data.course.connector.clientHost,
	  					port : data.body.data.course.connector.clientPort,
	  					roomId : data.body.data.course.roomId
	  				}
	  				//把端口存到store
	  				this.$store.dispatch('setPomeloServerAddress', _data);
	  				return new Promise(function (resolve, reject) {
	  					resolve(_data);
	  				})
	  			} else {
	  				return new Promise(function (resolve, reject) {
	  					reject(data.body);
	  				})
	  			}
	  		}).then(function (data) { //进行连接pomelo的服务器
	  			return new Promise(function (resolve, reject) {
  					pomelo.init({
		  				host : data.host,
		  				port : data.port
		  			}, function (_data) {
		  				resolve(_data);
		  			})
  				})
	  		}).then(function (data) { //进入教室
	  			pomeloRequet({
	  				path : 'connector.roomHandler.enter',
	  				data : {
	  					role : this.$store.getters.getUserData.role,
	  					uid : this.$store.getters.getUserData.uid,
	  					name : this.$store.getters.getUserData.name,
	  					roomId : this.$store.getters.getPomeloData.roomId
	  				}
	  			})
	  		}).then(function (data) { //进入成功
	  			console.log('进入教室成功！')
	  		}).catch(function (err) {
	  			console.log('catch', err);
	  		})

		}

	}
</script>

