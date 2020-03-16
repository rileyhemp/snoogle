import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { flatten } from "lodash";
import { config } from "../config";
import SearchInput from "../Components/SearchInput";
import { getPosts } from "../Redux/actions";
import theme from "../theme";

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
			this.props.getPosts(flatten(results));
		});
	};

	render() {
		return <SearchInput handleSearch={this.doSearch} />;
	}
}

export default connect(null, { getPosts })(Search);
