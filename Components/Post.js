import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Comments } from "./Comments";
import AddToFavorites from "./AddToFavorites";
import moment from "moment";
import theme from "../theme";

export const Post = ({ post, getReplies, toggleFullHeight }) => {
	const date = moment.unix(post.created).format("MMMM YYYY");
	const [showDetails, setShowDetails] = useState(false);
	const [comments, setComments] = useState(null);

	const onClickPost = () => {
		toggleFullHeight();

		if (!showDetails && !comments) {
			setShowDetails(true);
			getReplies(post.id)
				.then(res => {
					setComments(res.comments);
				})
				.catch(err => console.log(err));
		} else if (!showDetails && comments) {
			setShowDetails(true);
		} else {
			setShowDetails(false);
		}
	};

	const hidePost = () => {
		toggleFullHeight();
		setShowDetails(false);
	};

	return (
		<View style={[styles.post, showDetails ? styles.postActive : null]}>
			<TouchableOpacity onPress={() => onClickPost()} disabled={showDetails}>
				<View style={styles.header}>
					<View style={styles.flexBetween}>
						<Text style={styles.title}>{post.title}</Text>
						<Text style={[styles.smallText, styles.date]}>{date}</Text>
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
			{showDetails ? <AddToFavorites hideParent={onClickPost} back={true} parent={post} /> : null}
			{!comments && showDetails ? <ActivityIndicator size="large" color={theme.textPrimary} style={styles.spinner} /> : null}
			{comments && showDetails ? <Comments comments={comments} /> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	post: {
		borderColor: "black",
		borderBottomWidth: 0.25,
		paddingTop: 4
	},
	postActive: {
		position: "absolute",
		top: 0,
		bottom: 0,
		backgroundColor: theme.background,
		zIndex: 100,
		width: "100%"
	},
	// post: {
	// 	borderColor: "black",
	// 	borderBottomWidth: 0.25,
	// 	paddingTop: 4
	// },
	flexBetween: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start"
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: theme.textPrimary,
		flex: 1,
		paddingRight: 8,
		lineHeight: 20
	},
	postText: {
		paddingHorizontal: 8,
		color: theme.textPrimary,
		backgroundColor: "#494a48",
		paddingVertical: 8,
		borderBottomColor: theme.textSecondary,
		borderBottomWidth: 0.25
	},
	contentHidden: {
		height: 0,
		overflow: "hidden"
	},
	contentVisible: {
		overflow: "visible"
	},
	header: {
		borderBottomWidth: 0.25,
		paddingHorizontal: 8,
		paddingBottom: 8,
		borderBottomColor: theme.textSecondary
	},
	preview: {
		overflow: "hidden"
	},
	footer: {
		paddingHorizontal: 8,
		flexDirection: "row",
		justifyContent: "flex-start",
		justifyContent: "space-between",
		marginTop: 4
	},
	smallText: {
		fontSize: 12,
		color: theme.textPrimary,
		color: theme.textSecondary
	},
	date: {
		paddingTop: 3
	},
	spinner: {
		top: 50
	}
});
