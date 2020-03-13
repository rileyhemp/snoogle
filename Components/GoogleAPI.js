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
			pagesToSearch: 1,
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
		those results. */

		const searchResults = [];
		for (let i = 0; i < this.config.pagesToSearch; i++) {
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
			let results = [];
			res.forEach(el => results.push(el.items));
			this.sortByComments(flatten(results));
		});
	}
	sortByComments(posts) {
		//Uses google's meta description to sort posts by number of replies

		const postsWithReplies = [];

		//Get the number of comments from the meta description and filters out posts with zero comments.
		//Description looks like this: '125 points and 26 comments'
		for (let i = 0; i < posts.length; i++) {
			if (posts[i].pagemap) {
				const description = posts[i].pagemap.metatags[0]['og:description'];
				posts[i].totalComments = description.split('and ')[1].split(' comments')[0];
				postsWithReplies.push(posts[i]);
			}
		}

		//Sort by comments high to low
		postsWithReplies.sort((a, b) => b.totalComments - a.totalComments);

		//Get the post IDs from the URL, push to an array, and send to handler.
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
				autoFocus={true}
				clearTextOnFocus={true}
				onEndEditing={() => this.search()}
				dogs
				onChangeText={text => this.onChangeText(text)}
				placeholder="Ask a question"
			/>
		);
	}
}

const styles = StyleSheet.create({
	searchbar: {
		flexDirection: 'row',
		marginHorizontal: 24,
		backgroundColor: 'white',
		borderRadius: 50,
		paddingHorizontal: 7,
		marginTop: 24,
		marginBottom: 12,
	},
});
