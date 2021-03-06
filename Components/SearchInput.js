import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import theme from "../theme";

export default class SearchInput extends Component {
	state = {
		query: null
	};
	onChangeText(text) {
		this.setState({ query: text });
	}
	onSearch(query) {
		this.props.handleSearch(query);
	}
	render() {
		return (
			<TextInput
				style={styles.searchbar}
				inlineImageLeft="snoo"
				inlineImagePadding={16}
				returnKeyType="search"
				// autoFocus={true}
				clearTextOnFocus={true}
				onEndEditing={() => this.onSearch(this.state.query)}
				dogs
				onChangeText={text => this.onChangeText(text)}
				placeholder="Ask a question"
			/>
		);
	}
}

const styles = StyleSheet.create({
	searchbar: {
		flexDirection: "row",
		marginHorizontal: 24,
		backgroundColor: theme.textPrimary,
		borderRadius: 50,
		paddingHorizontal: 7,
		marginTop: 24,
		marginBottom: 12
	}
});
