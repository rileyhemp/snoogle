import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import theme from "../theme";

export const AddToFavorites = ({ parent, addFavorite, hideParent, back }) => {
	const onAddFavorite = () => {
		console.log("adding favorite");
	};
	const onHideParent = () => {
		hideParent(true);
	};
	return (
		<View style={styles.toolbar}>
			<View style={styles.flex}>
				<TouchableOpacity onPress={onHideParent}>
					<Text style={[styles.padRight, styles.textButton]}>{back ? "BACK" : "HIDE"}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={onAddFavorite}>
					<Text style={[styles.padRight, styles.textButton]}>SAVE</Text>
					{/* <Icon name="heart" color="white" backgroundColor="transparent" size={16} /> */}
				</TouchableOpacity>
			</View>
			{back ? (
				<TouchableOpacity onPress={onAddFavorite}>
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
	textButton: {
		color: theme.textPrimary,
		fontWeight: "700",
		letterSpacing: 2,
		paddingRight: 20
	},
	padRight: {
		paddingRight: 20
	}
});
