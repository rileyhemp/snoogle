import axios from 'axios';
import snoowrap from 'snoowrap';
export const getPostsFromIDs = function(posts) {
	snoowrap
		.fromApplicationOnlyAuth({
			clientId: 'S0qvSFIjP95kqw',
			deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
			grantType: snoowrap.grantType.INSTALLED_CLIENT,
		})
		.then(r => {
			r._nextRequestTimestamp = -1;
			r.config({debug: true, proxies: false});
			r.getContentByIds(posts)
				.then(res => {
					return res.data;
				})
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
};
