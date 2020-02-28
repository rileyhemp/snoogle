import React, { Component } from 'react';
import axios from 'axios'
import {View, Text, Button } from 'react-native';
import {config} from '../config'
import AsyncStorage from '@react-native-community/async-storage';

export default class Test extends Component {
	search(){
		
		// this.storeData('test', 'some data')
		this.getData('test')
		// axios
		// .get(`https://www.googleapis.com/customsearch/v1?key=${config.GOOGLE_API_KEY}&cx=${config.GOOGLE_CSE_ID}&q=lectures`)
		// .then(res => console.log(res))
		// .catch(e => console.log(e))
	}
	storeData = async (key, value) => {
		console.log('hey')
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			console.log(e)
		}
	}
	getData = async (key) => {
		try {
    		const value = await AsyncStorage.getItem(key)
    		if(value !== null) {
				console.log(value)
    		}
  		} catch(e) {
   			console.log(e)
  		}
	}
	render(){
		return <Button title="Search" onPress={()=>this.search()}/>
	}
}