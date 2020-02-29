import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {getReplies} from './RedditAPI';
import moment from 'moment';

const Comment = ({comment}) => {
	const created = moment.unix(comment.created).format('MMM Do YYYY');
	return (
		<View style={styles.comment}>
			<View style={styles.header}>
				<Text>{comment.author.name}</Text>
				<Text>{created}</Text>
			</View>
			<Text style={styles.body}>{comment.body}</Text>
			{comment.replies
				? comment.replies.map(comment => {
						return <Comment comment={comment} />;
				  })
				: null}
		</View>
	);
};

export const Comments = ({comments}) => {
	return (
		<View>
			{comments.map(comment => {
				return <Comment comment={comment} />;
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
