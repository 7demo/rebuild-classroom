/**
 * 监听pomelo
 */

import store from '../vuex/store';
function onPomelo(Vue) {

	if (onPomelo.installed) {
        return;
    }
    //注册一个新的vue实例，为了调用$store
    let _vue = new Vue({
    	store
    });

    
    // 	//进入房间
	pomelo.on('room.enter_push', function (data) {
		console.log('这是pomelo进入房间的通知', data)
		data.data.users = JSON.parse(data.data.users);
		_vue.$store.dispatch('setUsers', data.data.users);
		if (data.data.uid == _vue.$store.getters.getUserData.uid) { //若是自己進入教室
			Object.keys(data.data.users).map( (i, v) => {
				_vue.$store.dispatch('setUsersOrder', {
					uid : data.data.users[i].uid,
					type : 'add'
				})
			})
		} else { //若是他人進入教室通知
			_vue.$store.dispatch('setUsersOrder', {
				uid : data.data.uid,
				type : 'add'
			})
		}

		console.log(_vue.$store.getters.getUsersData)

	})

    pomelo.on('room.fabric_push', function (data) {
		
		if (data.data.uid === _vue.$store.getters.getUserData.uid) return;
		data.data.data = JSON.parse(data.data.data);
		switch (data.data.type) {

			//鼠标抬起与落下
			case 'drawFlag':
				if (data.data.data.mouse == 'down') {
					_vue.$store.dispatch('startDraw', {
						uid : data.data.uid
					})
				} else {
					_vue.$store.dispatch('finshDraw', {
						uid : data.data.uid
					})
				}
				break;

			//鼠标点
			case 'draw' :
				_vue.$store.dispatch('runDraw', {
					uid : data.data.uid,
					x : data.data.data.x,
					y : data.data.data.y
				})
				break;


		} 
	})

}

export default onPomelo;