import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {getReplies} from './RedditAPI';
import moment from 'moment';

export const Post = ({post}) => {
	const date = moment.unix(post.created).format('MMMM YYYY');
	const [previewLines, setPreviewLines] = useState(3);
	const onClickPost = () => {
		previewLines ? setPreviewLines(null) : setPreviewLines(3);
		getReplies(post.id)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};
	return (
		<View style={styles.post}>
			<TouchableOpacity onPress={() => onClickPost()}>
				<View style={styles.header}>
					<Text style={styles.title}>{post.title}</Text>
				</View>
				<View style={styles.preview}>
					<Text numberOfLines={previewLines} style={styles.content}>
						{post.selftext}
					</Text>
					<View style={styles.footer}>
						<Text style={styles.smallText}>{post.num_comments} comments</Text>
						<Text style={styles.smallText}>{date}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	post: {
		padding: 5,
		borderColor: 'black',
		borderBottomWidth: 0.25,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	header: {
		borderBottomWidth: 0.25,
		marginBottom: 5,
	},
	preview: {
		overflow: 'hidden',
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		justifyContent: 'space-between',
		marginTop: 4,
	},
	smallText: {
		fontSize: 12,
	},
});
