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
			this.setState({
				results: [
					...results[0].items,
					...results[1].items,
					...results[2].items,
				],
			});
		});
	}
	test() {
		let newResult = [
			...results[0].items,
			...results[1].items,
			...results[2].items,
		];

		console.log(JSON.stringify(newResult));
	}
	render() {
		return <Button title="Search" onPress={() => this.search()} />;
	}
}
