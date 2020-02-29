import axios from 'axios';
import snoowrap from 'snoowrap';
let RedditAPI;
console.log('i did things');
export const getAccessToken = function() {
	snoowrap
		.fromApplicationOnlyAuth({
			clientId: 'S0qvSFIjP95kqw',
			deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
			grantType: snoowrap.grantType.INSTALLED_CLIENT,
		})
		.then(r => {
			r._nextRequestTimestamp = -1;
			r.config({debug: true, proxies: false});
			RedditAPI = r;
			console.log(RedditAPI);
		});
};

// export default class RedditAPI {

// }
