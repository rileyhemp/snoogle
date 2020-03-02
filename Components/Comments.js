import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {getReplies} from './RedditAPI';
import moment from 'moment';

const Comment = ({comment, depth}) => {
	const date = moment.unix(comment.created).format('MM D YY');
	const [maxDepth, setMaxDepth] = useState(2);
	const [hideSelf, setHideSelf] = useState(false);
	const onPressContinue = () => {
		setMaxDepth(10);
	};
	const handleHideSelf = state => {
		setHideSelf(state);
	};
	return (
		<View>
			<Text style={hideSelf ? styles.hiddenLink : styles.hidden} onPress={() => handleHideSelf(false)}>
				Hidden, tap to show...
			</Text>
			<View style={hideSelf ? styles.hidden : styles.comment}>
				<View style={styles.header}>
					<Text style={styles.smallText}>
						{comment.score} points • {comment.author.name}
					</Text>
				</View>
				<Text style={styles.body} onPress={() => handleHideSelf(true)}>
					{comment.body}
				</Text>
				{comment.replies && depth < maxDepth ? (
					comment.replies.map(comment => {
						return <Comment key={comment.id} comment={comment} depth={depth + 1} />;
					})
				) : comment.replies.length > 0 ? (
					<Text style={styles.link} onPress={onPressContinue}>
						Continue thread...
					</Text>
				) : null}
			</View>
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
		paddingLeft: 24,
	},
	hiddenLink: {
		paddingLeft: 4,
		marginLeft: 20,
		fontSize: 12,
		color: '#5cc8ff',
		marginVertical: 4,
		paddingTop: 12,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingRight: 8,
		paddingTop: 12,
		paddingBottom: 4,
		alignItems: 'center',
	},
	body: {
		borderBottomWidth: 0.25,
		borderColor: '#aaada6',
		paddingBottom: 4,
		color: 'white',
		paddingRight: 8,
	},
	hidden: {
		height: 0,
		overflow: 'hidden',
	},
	smallText: {
		fontSize: 12,
		color: '#aaada6',
	},
	link: {
		fontSize: 12,
		color: '#5cc8ff',
		marginTop: 4,
	},
});
