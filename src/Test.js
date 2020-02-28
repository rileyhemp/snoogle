import React, { Component } from 'react';

import {View, Text } from 'react-native';

export default class Test extends Component {
	componentDidMount(){
		console.log('i am console')
	}
	render(){
		return <Text>I am a component</Text>
	}
}