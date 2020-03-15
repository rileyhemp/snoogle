import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AddToFavorites from "./AddToFavorites";
import moment from "moment";
import theme from "../theme";

const Comment = ({ comment, depth, addToFavorites }) => {
	const date = moment.unix(comment.created).format("MM D YY");
	const [maxDepth, setMaxDepth] = useState(2);
	const [hideSelf, setHideSelf] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const onPressContinue = () => {
		setMaxDepth(10);
	};
	const handleHideSelf = state => {
		setHideSelf(state);
		setShowDetails(false);
	};
	const toggleShowDetails = () => {
		if (!showDetails) {
			setShowDetails(true);
		} else setShowDetails(false);
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
				<Text style={styles.body} onPress={() => toggleShowDetails(true)}>
					{comment.body}
				</Text>
				{showDetails ? <AddToFavorites hideParent={handleHideSelf} parent={comment} addToFavorites={addToFavorites} /> : null}
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

export const Comments = ({ comments, addToFavorites }) => {
	return (
		<View style={styles.commentsContainer}>
			{comments.map(comment => {
				return <Comment key={comment.id} comment={comment} depth={0} addToFavorites={addToFavorites} />;
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	comment: {
		paddingLeft: 24
	},
	hiddenLink: {
		paddingLeft: 4,
		marginLeft: 20,
		fontSize: 12,
		color: theme.link,
		marginVertical: 4,
		paddingTop: 12
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingRight: 8,
		paddingTop: 8,
		paddingBottom: 4,
		alignItems: "center"
	},
	body: {
		borderBottomWidth: 0.25,
		borderColor: theme.textSecondary,
		paddingBottom: 8,
		color: theme.textPrimary,
		paddingRight: 8
	},
	hidden: {
		height: 0,
		overflow: "hidden"
	},
	smallText: {
		fontSize: 12,
		color: theme.textSecondary
	},
	link: {
		fontSize: 12,
		color: theme.link,
		marginTop: 4
	}
});
