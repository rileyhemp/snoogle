import React, {useEffect} from 'react';
import axios from 'axios';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import Search from './Components/Search';

const App: () => React$Node = () => {
	useEffect(() => {
		console.log('loaded');
	}, []);
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<View style={styles.body}>
					<Text>I am some extra text</Text>
					<Search onSortedPosts={handleSortedPosts} />
				</View>
			</SafeAreaView>
		</>
	);
};

const handleSortedPosts = posts => {
	//Expects an array of post IDs, and sends them to the Reddit API
};

const styles = StyleSheet.create({
	body: {
		padding: 20,
	},
});

export default App;

// const styles = StyleSheet.create({
// 	scrollView: {
// 		backgroundColor: Colors.lighter,
// 	},
// 	engine: {
// 		position: 'absolute',
// 		right: 0,
// 	},
// 	body: {
// 		backgroundColor: Colors.white,
// 	},
// 	sectionContainer: {
// 		marginTop: 32,
// 		paddingHorizontal: 24,
// 	},
// 	sectionTitle: {
// 		fontSize: 24,
// 		fontWeight: '600',
// 		color: Colors.black,
// 	},
// 	sectionDescription: {
// 		marginTop: 8,
// 		fontSize: 18,
// 		fontWeight: '400',
// 		color: Colors.dark,
// 	},
// 	highlight: {
// 		fontWeight: '700',
// 	},
// 	footer: {
// 		color: Colors.dark,
// 		fontSize: 12,
// 		fontWeight: '600',
// 		padding: 4,
// 		paddingRight: 12,
// 		textAlign: 'right',
// 	},
// });
