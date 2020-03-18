import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import theme from "../theme";

export const OptionsBar = ({ parent, hideParent, back, dispatch }) => {
	const onHideParent = () => {
		hideParent(true);
	};
	const openInReddit = () => {
		console.log(parent);
		const id = parent.name.split("_")[1];
		const url = "https://reddit.com/" + id;
		Linking.openURL(url).catch(err => console.error("An error occurred", err));
	};
	return (
		<View style={styles.toolbar}>
			<View style={styles.flex}>
				<TouchableOpacity onPress={onHideParent}>
					<Text style={[styles.padRight, styles.textButton]}>{back ? "BACK" : "HIDE"}</Text>
				</TouchableOpacity>
			</View>
			{back ? (
				<TouchableOpacity onPress={openInReddit}>
					<Text style={styles.textButton}>OPEN IN REDDIT</Text>
				</TouchableOpacity>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	flex: {
		display: "flex",
		flexDirection: "row"
	},
	toolbar: {
		width: "100%",
		height: 24,
		backgroundColor: theme.background,
		borderTopColor: theme.textSecondary,
		borderBottomWidth: 0.25,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 8
	},
	button: {
		backgroundColor: "transparent"
	},
	textButton: {
		color: theme.textPrimary,
		fontWeight: "700",
		letterSpacing: 2,
		paddingRight: 20,
		fontSize: 12
	},
	padRight: {
		paddingRight: 20
	}
});
