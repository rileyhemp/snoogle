import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {getReplies} from './RedditAPI';
import {Comments} from './Comments';
import moment from 'moment';

export const Post = ({post}) => {
	const date = moment.unix(post.created).format('MMMM YYYY');
	const [showDetails, setShowDetails] = useState(false);
	const [comments, setComments] = useState(null);

	const onClickPost = () => {
		!showDetails && !comments
			? getReplies(post.id)
					.then(res => {
						setComments(res.comments);
						setShowDetails(true);
					})
					.catch(err => console.log(err))
			: !showDetails && comments
			? setShowDetails(true)
			: setShowDetails(false);
	};

	return (
		<View style={styles.post}>
			<TouchableOpacity onPress={() => onClickPost()}>
				<View style={styles.header}>
					<View style={styles.flexBetween}>
						<Text style={styles.title}>{post.title}</Text>
						<Text style={styles.smallText}>{date}</Text>
					</View>
					<Text style={styles.smallText}>
						{post.author.name} • {post.subreddit.display_name}
					</Text>
					<Text style={styles.smallText}>
						{post.num_comments} comments • {post.score} points
					</Text>
				</View>
				<View style={showDetails ? styles.contentVisible : styles.contentHidden}>
					<Text style={styles.postText}>{post.selftext}</Text>
				</View>
			</TouchableOpacity>
			{comments && showDetails ? <Comments comments={comments} /> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	post: {
		borderColor: 'black',
		borderBottomWidth: 0.25,
		paddingTop: 4,
	},
	flexBetween: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
	},
	postText: {
		paddingHorizontal: 8,
		color: 'white',
		backgroundColor: '#494a48',
		paddingVertical: 8,
		borderBottomColor: '#aaada6',
		borderBottomWidth: 0.25,
	},
	contentHidden: {
		height: 0,
		overflow: 'hidden',
	},
	contentVisible: {
		overflow: 'visible',
	},
	header: {
		borderBottomWidth: 0.25,
		paddingHorizontal: 8,
		paddingBottom: 8,
		borderBottomColor: '#aaada6',
	},
	preview: {
		overflow: 'hidden',
	},
	footer: {
		paddingHorizontal: 8,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		justifyContent: 'space-between',
		marginTop: 4,
	},
	smallText: {
		fontSize: 12,
		color: 'white',
		color: '#aaada6',
	},
});