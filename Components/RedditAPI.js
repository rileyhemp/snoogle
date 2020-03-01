import React from 'react';
import axios from 'axios';
import snoowrap from 'snoowrap';

export const getPostsFromIDs = function(posts) {
	return new Promise((resolve, reject) => {
		//Authenticate
		snoowrap
			.fromApplicationOnlyAuth({
				clientId: 'S0qvSFIjP95kqw',
				deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
				grantType: snoowrap.grantType.INSTALLED_CLIENT,
			})
			.then(r => {
				//Config to get snoowrap to work with react native
				r._nextRequestTimestamp = -1;
				r.config({debug: true, proxies: false});

				//Call the API
				r.getContentByIds(posts)
					.then(res => {
						resolve(res);
					})
					.catch(err => reject(err));
			})
			.catch(err => reject(err));
	});
};
export const getReplies = function(post) {
	return new Promise((resolve, reject) => {
		//Authenticate
		snoowrap
			.fromApplicationOnlyAuth({
				clientId: 'S0qvSFIjP95kqw',
				deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
				grantType: snoowrap.grantType.INSTALLED_CLIENT,
			})
			.then(r => {
				//Config to get snoowrap to work with react native
				r._nextRequestTimestamp = -1;
				r.config({debug: true, proxies: false});

				//Call the API
				r.getSubmission(post)
					.expandReplies({depth: 2})
					.then(res => {
						resolve(res);
					})
					.catch(err => reject(err));
			})
			.catch(err => reject(err));
	});
};
