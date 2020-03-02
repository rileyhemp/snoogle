import React, {Component} from 'react';
import axios from 'axios';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {config} from '../config';
import AsyncStorage from '@react-native-community/async-storage';
import {flatten} from 'lodash';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.config = {
			key: config.GOOGLE_API_KEY,
			cx: config.GOOGLE_CSE_ID,
			fields: 'items(link,pagemap(metatags(og:description)))', //Only pull the link and meta description (shows upvotes and comments)
		};
	}
	state = {
		results: null,
		query: null,
	};

	search() {
		this.props.clearResults();
		/* Searches the top n pages of google and creates a new array with 
		those results. Reason: google is good at finding keywords, but not good at finding posts
		which have many replies. This lets us choose the most active posts. */

		const searchResults = [];

		for (let i = 0; i < 1; i++) {
			searchResults.push(
				new Promise((resolve, reject) => {
					axios
						.get(`https://www.googleapis.com/customsearch/v1`, {
							params: {
								...this.config,
								q: this.state.query,
								start: i * 10 + 1,
							},
						})
						.then(res => resolve(res.data))
						.catch(e => reject(e));
				}),
			);
		}
		Promise.all(searchResults).then(res => {
			console.log(res);
			this.sortByComments([...res[0].items]); //, ...res[1].items, ...res[2].items]
		});
	}
	sortByComments(posts) {
		console.log('sorting', posts);
		//Expects an array of search results from google
		//Uses meta description to sort posts by number of replies

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

	onChangeText(text) {
		this.setState({query: text});
	}

	render() {
		return (
			<TextInput
				style={styles.searchbar}
				inlineImageLeft="snoo"
				inlineImagePadding={16}
				returnKeyType="search"
				onEndEditing={() => this.search()}
				dogs
				onChangeText={text => this.onChangeText(text)}
			/>
		);
		//return <Button title="Search" onPress={() => this.sortByComments(results)} />;
	}
}

const styles = StyleSheet.create({
	searchbar: {
		flexDirection: 'row',
		marginHorizontal: 24,
		backgroundColor: 'white',
		borderRadius: 50,
		paddingHorizontal: 12,
		marginTop: 24,
		marginBottom: 12,
	},
});
