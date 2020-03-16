import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getFavorites } from "../Redux/actions";
import { Post } from "../Components/Post";
import axios from "axios";
import snoowrap from "snoowrap";
import { config } from "../config";
import theme from "../theme";

function mapState({ favorites }) {
	return {
		...favorites
	};
}

class Favorites extends Component {
	state = {
		postData: undefined,
		isFullHeight: false,
		scrollY: 0
	};
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
	componentDidUpdate() {
		console.log("displaying favorites", this.props.favorites.length);
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
				{this.props.favorites?.length > 0
					? this.props.favorites.map(item => {
							return (
								<Post
									key={this.props.favorites.indexOf(item)}
									post={item}
									getReplies={this.getReplies}
									toggleFullHeight={this.toggleFullHeight}
								/>
							);
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
		backgroundColor: theme.background,
		zIndex: 100
	}
});

export default connect(mapState)(Favorites);
