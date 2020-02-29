import axios from 'axios';
import snoowrap from 'snoowrap';
let api;
snoowrap
	.fromApplicationOnlyAuth({
		clientId: 'S0qvSFIjP95kqw',
		deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
		grantType: snoowrap.grantType.INSTALLED_CLIENT,
	})
	.then(r => {
		r._nextRequestTimestamp = -1;
		r.config({debug: true, proxies: false});
		api = r;
	});
export const getAccessToken = function() {
	api.getHot().then(posts => console.log(posts));
};

export const checkAccessToken = function() {
	console.log('validating token');
};

export const getPosts = function(posts) {
	console.log('getting posts: ', posts);
};

function urlEncode(data) {
	let out = [];

	for (let key in data) {
		out.push(`${key}=${encodeURIComponent(data[key])}`);
	}

	return out.join('&');
}

// let formData = new FormData();
// formData.append('grant_type', 'https://oauth.reddit.com/grants/installed_client');
// formData.append('device_id', 'DO_NOT_TRACK_THIS_DEVICE');
// console.log(formData);
// axios({
// 	method: 'POST',
// 	url: 'https://www.reddit.com/api/v1/access_token',
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded',
// 		Authorization: 'Basic UzBxdlNGSWpQOTVrcXc6',
// 	},
// 	body: formData,
// 	// auth: {
// 	// 	username: 'S0qvSFIjP95kqw',
// 	// 	password: ' ',
// 	// },
// })
// 	.then(res => console.log(res.data))
// 	.catch(e => console.log('error: ', e));
