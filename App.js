import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux"; //????
import reducer from "./reducer";
import store from "./store";
import moment from "moment";
import Search from "./Containers/Search";
import Results from "./Containers/Results";

const App: () => React$Node = () => {
	return (
		<>
			<Provider store={store}>
				<StatusBar barStyle="dark-content" />
				<SafeAreaView style={styles.body}>
					<Search />
					<Results />
				</SafeAreaView>
			</Provider>
		</>
	);
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: "#343633",
		height: "100%"
	}
});

export default App;
