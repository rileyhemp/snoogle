import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import theme from "../theme";

export const AddToFavorites = ({ parent, addFavorite }) => {
	const onAddFavorite = () => {
		console.log("adding favorite");
	};
	const onHideParent = () => {
		console.log("hiding parent");
	};
	return (
		<View style={styles.toolbar}>
			<TouchableOpacity onPress={onHideParent}>
				<Text style={styles.hideButton}>HIDE</Text>
			</TouchableOpacity>
			<Icon.Button name="heart" backgroundColor="transparent" onPress={onAddFavorite} />
		</View>
	);
};

const styles = StyleSheet.create({
	toolbar: {
		width: "100%",
		height: 30,
		backgroundColor: theme.textSecondary,
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
	hideButton: {
		color: theme.textPrimary,
		fontWeight: "700",
		letterSpacing: 2
	}
});
