import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {getReplies} from './RedditAPI';
import moment from 'moment';

const Comment = ({comment, depth}) => {
	const created = moment.unix(comment.created).format('MMM Do YYYY');
	const [maxDepth, setMaxDepth] = useState(2);
	const onPressContinue = () => {
		setMaxDepth(10);
	};
	return (
		<View style={styles.comment}>
			<View style={styles.header}>
				<Text>
					{comment.score} {comment.author.name}
				</Text>
				<Text>{created}</Text>
			</View>
			<Text style={styles.body}>{comment.body}</Text>
			{comment.replies && depth < maxDepth ? (
				comment.replies.map(comment => {
					return <Comment key={comment.id} comment={comment} depth={depth + 1} />;
				})
			) : comment.replies ? (
				<Text style={styles.link} onPress={onPressContinue}>
					Continue thread...
				</Text>
			) : null}
		</View>
	);
};

export const Comments = ({comments}) => {
	return (
		<View>
			{comments.map(comment => {
				return <Comment key={comment.id} comment={comment} depth={0} />;
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	comment: {
		marginLeft: 16,
		marginTop: 8,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	body: {
		borderBottomWidth: 0.25,
		borderRightWidth: 0.25,
		paddingBottom: 4,
	},
});
