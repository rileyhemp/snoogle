import React, {Component} from 'react';
import axios from 'axios';
import {View, Text, Button} from 'react-native';
import {config} from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import {flatten} from 'lodash';
import {results} from './results';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.query = {
			key: config.GOOGLE_API_KEY,
			cx: config.GOOGLE_CSE_ID,
			q: 'best knives cooking', //props.query,
			fields: 'items(link,pagemap(metatags(og:description)))',
		};
	}
	state = {
		results: results,
	};
	search() {
		const searchResults = [];
		for (let i = 0; i < 3; i++) {
			searchResults.push(
				new Promise((resolve, reject) => {
					axios
						.get(`https://www.googleapis.com/customsearch/v1`, {
							params: {
								...this.query,
								prettyPrint: true,
								start: i * 10 + 1,
							},
						})
						.then(res => resolve(res.data))
						.catch(e => reject(e));
				}),
			);
		}
		Promise.all(searchResults).then(res => {
			console.log(JSON.stringify([...res[0].items, ...res[1].items, ...res[2].items]));
			// this.setState({
			// 	results: [...res[0].items, ...res[1].items, ...res[2].items],
			// });
		});
	}
	sortByComments(posts) {
		//Use meta description to determine which posts had replies,
		//and assign that as a property to the post object
		const postsWithReplies = [];
		for (let i = 0; i < posts.length; i++) {
			if (posts[i].pagemap) {
				const description = posts[i].pagemap.metatags[0]['og:description'];
				posts[i].totalComments = description.split('and ')[1].split(' comments')[0];
				postsWithReplies.push(posts[i]);
			}
		}
		//Sort the posts by comments
		postsWithReplies.sort((a, b) => b.totalComments - a.totalComments);
		//Create a new array with just the post IDs
		const postIDs = [];
		postsWithReplies.forEach(el => {
			const ID = el.link.split('comments/')[1].split('/')[0];
			postIDs.push(ID);
		});
		this.props.onSortedPosts(postIDs);
	}
	render() {
		return <Button title="Search" onPress={() => this.sortByComments(results)} />;
	}
}
