import React, {Component} from 'react';
import axios from 'axios';
import {View, Text, Button} from 'react-native';
import {config} from '../config';
import AsyncStorage from '@react-native-community/async-storage';

export default class Search extends Component {
	constructor(props) {
		super(props);
		this.query = {
			key: config.GOOGLE_API_KEY,
			cx: config.GOOGLE_CSE_ID,
			q: props.query,
			fields: 'items(link,pagemap(metatags(og:description)))',
		};
	}
	async search() {
		axios
			.get(`https://www.googleapis.com/customsearch/v1`, {
				params: {
					...this.query,
					start: 1,
				},
			})
			.then(res => console.log(res))
			.catch(e => console.log(e));
	}
	render() {
		return <Button title="Search" onPress={() => this.search()} />;
	}
}
