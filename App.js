import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import {getPostsFromIDs} from './Components/RedditAPI';
import Search from './Components/GoogleAPI';

const Post = ({post}) => {
	return (
		<View style={styles.post}>
			<Text style={styles.title}>{post.title}</Text>
			<Text style={styles.date}>{post.created}</Text>
		</View>
	);
};

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
		padding: 20,
	},
	post: {
		padding: 5,
		borderColor: 'black',
		borderWidth: 0.25,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
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
