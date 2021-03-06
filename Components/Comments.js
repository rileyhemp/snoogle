import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { OptionsBar } from "./OptionsBar";
import moment from "moment";
import theme from "../theme";

const Comment = ({ comment, depth, toggleShowDetails, showDetails }) => {
	const date = moment.unix(comment.created).format("MM D YY");
	const [maxDepth, setMaxDepth] = useState(2);
	const [hideSelf, setHideSelf] = useState(false);
	const onPressContinue = () => {
		setMaxDepth(10);
	};
	const handleShowDetails = showDetails => {
		if (showDetails === comment.id) {
			toggleShowDetails();
		} else toggleShowDetails(comment.id);
	};
	const handleHideSelf = state => {
		toggleShowDetails();
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
				<TouchableOpacity onPress={() => handleShowDetails(showDetails)}>
					<Text style={styles.body}>{comment.body}</Text>
				</TouchableOpacity>
				{showDetails === comment.id ? <OptionsBar hideParent={handleHideSelf} parent={{ ...comment }} /> : null}
				{comment.replies && depth < maxDepth ? (
					comment.replies.map(comment => {
						return (
							<Comment
								key={comment.id}
								comment={comment}
								depth={depth + 1}
								toggleShowDetails={toggleShowDetails}
								showDetails={showDetails}
							/>
						);
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

export const Comments = ({ comments }) => {
	const [showDetails, setShowDetails] = useState(null);
	//Shows toolbar for only one comment at once
	const toggleShowDetails = id => {
		setShowDetails(id);
	};
	return (
		<View style={styles.commentsContainer}>
			{comments.map(comment => {
				return <Comment key={comment.id} comment={comment} depth={0} toggleShowDetails={toggleShowDetails} showDetails={showDetails} />;
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
