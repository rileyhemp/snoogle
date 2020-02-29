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
			//Only pull the link and meta description, which contains the number of comments and upvotes.
			fields: 'items(link,pagemap(metatags(og:description)))',
		};
	}
	state = {
		results: results,
	};

	search() {
		/* Searches the top n pages of google and creates a new array with 
		those results. Reason: google is good at finding keywords, but not good at finding posts
		which have many replies. This lets us choose the most active posts. */

		const searchResults = [];
		const pagesToSearch = 3;

		for (let i = 0; i < pagesToSearch; i++) {
			searchResults.push(
				new Promise((resolve, reject) => {
					axios
						.get(`https://www.googleapis.com/customsearch/v1`, {
							params: {
								...this.query,
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
		//and assign the number of replies as a prop

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

		//Create array of post ids and send to the handler

		const postIDs = [];

		postsWithReplies.forEach(el => {
			const ID = el.link.split('comments/')[1].split('/')[0]; //Split url before id
			postIDs.push('t3_' + ID); //Add t3_, Reddit's submission identifier.
		});

		this.props.onSortedPosts(postIDs);
	}

	render() {
		return <Button title="Search" onPress={() => this.sortByComments(results)} />;
	}
}
