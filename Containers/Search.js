import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { flatten } from "lodash";
import { config } from "../config";
import SearchInput from "../Components/SearchInput";
import { getPosts } from "../Redux/actions";

class Search extends Component {
	constructor(props) {
		super(props);
		this.config = {
			key: config.GOOGLE_API_KEY,
			cx: config.GOOGLE_CSE_ID,
			pagesToSearch: 1,
			fields: "items(link,pagemap(metatags(og:description)))" //Only pull the link and meta description (shows upvotes and comments)
		};
	}

	doSearch = query => {
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
								q: query,
								start: i * 10 + 1
							}
						})
						.then(res => resolve(res.data))
						.catch(e => reject(e));
				})
			);
		}
		Promise.all(searchResults).then(res => {
			let results = [];
			res.forEach(el => results.push(el.items));
			console.log(flatten(results));
			this.props.getPosts(flatten(results));
		});
	};

	sortByComments(posts) {
		//Uses google's meta description to sort posts by number of replies

		const postsWithReplies = [];

		//Get the number of comments from the meta description and filters out posts with zero comments.
		//Description looks like this: '125 points and 26 comments'
		for (let i = 0; i < posts.length; i++) {
			if (posts[i].pagemap) {
				const description = posts[i].pagemap.metatags[0]["og:description"];
				posts[i].totalComments = description.split("and ")[1].split(" comments")[0];
				postsWithReplies.push(posts[i]);
			}
		}

		//Sort by comments high to low
		postsWithReplies.sort((a, b) => b.totalComments - a.totalComments);

		//Get the post IDs from the URL, push to an array, and send to handler.
		const postIDs = [];

		postsWithReplies.forEach(el => {
			const ID = el.link.split("comments/")[1].split("/")[0]; //Split url before id
			postIDs.push("t3_" + ID); //Add t3_, Reddit's submission identifier.
		});

		this.props.onSortedPosts(postIDs);
	}

	render() {
		return <SearchInput handleSearch={this.doSearch} />;
	}
}

export default connect(null, { getPosts })(Search);
