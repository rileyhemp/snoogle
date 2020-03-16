import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import snoowrap from "snoowrap";
import { config } from "../config";
import { Post } from "../Components/Post";
import { TempData } from "../TempData";
import theme from "../theme";

function mapState({ postIDs }) {
	return {
		...postIDs
	};
}

class Results extends Component {
	state = {
		postData: undefined,
		isFullHeight: false,
		scrollY: 0
	};
	handlePostData(postData) {
		this.setState({ postData: postData });
	}
	handleScroll(value) {
		this.setState({ scrollY: value });
	}
	toggleFullHeight = () => {
		//Scroll current post to top on open, scroll back to last position on close.
		!this.state.isFullHeight
			? this.scroller.scrollTo({ y: 0, animated: false })
			: this.scroller.scrollTo({ y: this.state.scrollY, animated: false });
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
			<ScrollView
				onScrollEndDrag={event => {
					this.handleScroll(event.nativeEvent.contentOffset.y);
				}}
				style={this.state.isFullHeight ? styles.fullHeight : null}
				ref={scroller => {
					this.scroller = scroller;
				}}
				scrollToOverflowEnabled={true}
			>
				{this.state.postData != undefined
					? this.state.postData.map(post => {
							return post.thumbnail === "self" ? (
								<Post
									key={this.state.postData.indexOf(post)}
									post={post}
									getReplies={this.getReplies}
									toggleFullHeight={this.toggleFullHeight}
									addToFavorites={this.handleAddFavorite}
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
		backgroundColor: theme.background
	}
});

export default connect(mapState)(Results);
