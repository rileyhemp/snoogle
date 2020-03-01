import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import moment from 'moment';
import {getPostsFromIDs} from './Components/RedditAPI';
import {Post} from './Components/Post';
import Search from './Components/GoogleAPI';

const App: () => React$Node = () => {
	const [postData, setPostData] = useState(undefined);
	useEffect(() => {
		postData != undefined ? console.log(postData[0]) : null;
	});
	const handleSortedPosts = posts => {
		//Expects an array of post IDs, and sends them to the Reddit API
		getPostsFromIDs(posts)
			.then(res => setPostData(res))
			.catch(err => console.log(err));
	};

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<View style={styles.body}>
					<Text>I am some extra text</Text>
					<Search onSortedPosts={handleSortedPosts} />
					{postData != undefined ? <Post post={postData[0]} /> : null}
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: '#343633',
	},
});

export default App;

//#343633
//#5cc8ff

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
