/**
 * request请求
 */
export const pomeloRequet = (data)=> {
	new Promise(function (resolve, reject) {
		resolve(pomelo.request(data.path, data.data));
	});
}
/**
 * notify 请求
 */
export const pomeloNofity = (data) => {
	pomelo.notify(data.path, data.data);
}

/**
 * 教室信息发送
 */
export const sendPomeloData = (data, cb) => {
	if (data.aimUid) {  //单发 为目标用户uid
		pomelo.notify('connector.roomHandler.fabricUid', {
			type : data.type,
			data : JSON.stringify(data.data),
			uid : data.uid,
			aimUid : data.aimUid 
		});
	} else { //群发
		pomelo.notify('connector.roomHandler.fabric', {
			type : data.type,
			data : JSON.stringify(data.data),
			uid : data.uid
		});
	}
	
	cb && cb();
}