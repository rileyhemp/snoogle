import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import snoowrap from "snoowrap";
import { config } from "../config";
import { Post } from "../Components/Post";

function mapState({ postIDs }) {
	return {
		...postIDs
	};
}

class Results extends Component {
	state = {
		postData: undefined
	};
	handlePostData(postData) {
		console.log("here");
		this.setState({ postData: postData });
	}
	getPostsFromIDs(posts) {
		return new Promise((resolve, reject) => {
			//Authenticate
			snoowrap
				.fromApplicationOnlyAuth({
					clientId: config.REDDIT_CLIENT_ID,
					deviceId: "DO_NOT_TRACK_THIS_DEVICE",
					grantType: snoowrap.grantType.INSTALLED_CLIENT
				})
				.then(r => {
					//Config to get snoowrap to work with react native
					r._nextRequestTimestamp = -1;
					r.config({ debug: true, proxies: false });

					//Call the API
					r.getContentByIds(posts)
						.then(res => {
							resolve(res);
						})
						.catch(err => reject(err));
				})
				.catch(err => reject(err));
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
	componentDidUpdate(prevProps) {
		if (this.props.postIDs?.join() != prevProps.postIDs?.join()) {
			this.getPostsFromIDs(this.props.postIDs).then(postData => this.handlePostData(postData));
		}
	}
	render() {
		return (
			<ScrollView>
				{this.state.postData != undefined
					? this.state.postData.map(post => {
							return post.thumbnail === "self" ? <Post key={this.state.postData.indexOf(post)} post={post} /> : null;
					  })
					: null}
			</ScrollView>
		);
	}
}

export default connect(mapState)(Results);
