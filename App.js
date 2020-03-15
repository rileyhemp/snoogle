import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Redux/Reducers";
import moment from "moment";
import Search from "./Containers/Search";
import Results from "./Containers/Results";
import theme from "./theme";

const store = createStore(rootReducer);

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
		backgroundColor: theme.background,
		height: "100%"
	}
});

export default App;
