import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import snoowrap from "snoowrap";
import { config } from "../config";
import { Post } from "../Components/Post";
import { TempData } from "../TempData";

function mapState({ postIDs }) {
	return {
		...postIDs
	};
}

class Results extends Component {
	state = {
		postData: undefined,
		isFullHeight: false
	};
	handlePostData(postData) {
		this.setState({ postData: postData });
	}
	toggleFullHeight = () => {
		this.setState(prevState => ({
			isFullHeight: !prevState.isFullHeight
		}));
	};
	getPostsFromIDs(posts) {
		return new Promise((resolve, reject) => {
			//Authenticate
			// snoowrap
			// 	.fromApplicationOnlyAuth({
			// 		clientId: config.REDDIT_CLIENT_ID,
			// 		deviceId: "DO_NOT_TRACK_THIS_DEVICE",
			// 		grantType: snoowrap.grantType.INSTALLED_CLIENT
			// 	})
			// 	.then(r => {
			// 		//Config to get snoowrap to work with react native
			// 		r._nextRequestTimestamp = -1;
			// 		r.config({ debug: true, proxies: false });
			// 		//Call the API
			// 		r.getContentByIds(posts)
			// 			.then(res => {
			// 				resolve(res);
			// 			})
			// 			.catch(err => reject(err));
			// 	})
			// 	.catch(err => reject(err));
		});
	}
	getReplies(post) {
		return new Promise((resolve, reject) => {
			//Authenticate
			snoowrap
				.fromApplicationOnlyAuth({
					clientId: "S0qvSFIjP95kqw",
					deviceId: "DO_NOT_TRACK_THIS_DEVICE",
					grantType: snoowrap.grantType.INSTALLED_CLIENT
				})
				.then(r => {
					//Config to get snoowrap to work with react native
					r._nextRequestTimestamp = -1;
					r.config({ debug: true, proxies: false });

					//Call the API
					r.getSubmission(post)
						.expandReplies({ depth: 2 })
						.then(res => {
							resolve(res);
						})
						.catch(err => reject(err));
				})
				.catch(err => reject(err));
		});
	}
	// componentDidUpdate(prevProps) {
	// 	if (this.props.postIDs?.join() != prevProps.postIDs?.join()) {
	// 		this.getPostsFromIDs(this.props.postIDs).then(postData => this.handlePostData(postData));
	// 	}
	// }
	componentDidMount() {
		this.handlePostData(TempData);
	}
	render() {
		return (
			<ScrollView style={this.state.isFullHeight ? styles.fullHeight : null}>
				{this.state.postData != undefined
					? this.state.postData.map(post => {
							return post.thumbnail === "self" ? (
								<Post
									key={this.state.postData.indexOf(post)}
									post={post}
									getReplies={this.getReplies}
									toggleFullHeight={this.toggleFullHeight}
								/>
							) : null;
					  })
					: null}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	fullHeight: {
		position: "absolute",
		top: 0,
		bottom: 0,
		backgroundColor: "#343633"
	}
});

export default connect(mapState)(Results);
