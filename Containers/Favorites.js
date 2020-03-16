import React, { Component } from "react";
import { Text, View } from "react-native";
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
	constructor(props) {
		super(props);
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
	componentDidUpdate() {
		console.log("displaying favorites", this.props.favorites.length);
	}
	render() {
		return (
			<View>
				{this.props.favorites?.length > 0
					? this.props.favorites.map(item => {
							return <Post post={item.element} />;
					  })
					: null}
			</View>
		);
	}
}

export default connect(mapState)(Favorites);
