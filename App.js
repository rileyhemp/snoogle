import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import moment from 'moment';
import {getPostsFromIDs} from './Components/RedditAPI';
import {Post} from './Components/Post';
import Search from './Components/GoogleAPI';

const App: () => React$Node = () => {
	const [postData, setPostData] = useState(undefined);

	const onClearResults = () => {
		setPostData(undefined);
	};
	const handleSortedPosts = posts => {
		//Expects an array of post IDs, and sends them to the Reddit API
		getPostsFromIDs(posts)
			.then(res => setPostData(res))
			.catch(err => console.log(err));
	};

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={styles.body}>
				<Search onSortedPosts={handleSortedPosts} clearResults={onClearResults} />
				<ScrollView>
					{postData != undefined
						? postData.map(post => {
								return post.thumbnail === 'self' ? (
									<Post key={postData.indexOf(post)} post={post} />
								) : null;
						  })
						: null}
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: '#343633',
		height: '100%',
	},
});

export default App;
